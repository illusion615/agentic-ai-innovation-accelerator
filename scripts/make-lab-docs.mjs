/**
 * Generates the fictional Contoso policy documents the labs are demonstrated on.
 *
 * The two versions exist to be in conflict. Lab 02 ends by asking what the
 * documents disagree about, and a single tidy document makes that step
 * impossible to run — so the superseded 2024 edition deliberately carries
 * different figures for the same rules.
 *
 * The figures are also chosen to close the loop from Lab 01: the taxi and
 * client-dinner questions the ungrounded agent could not answer are answerable
 * from these documents, so the room sees the same three questions improve.
 *
 * Usage: node scripts/make-lab-docs.mjs <output-dir>
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, Footer,
} from 'docx';

const DISCLAIMER =
  'Contoso Ltd. is a fictional company. This document is sample content created for hands-on lab exercises and describes no real organisation or policy.';

/** Rules that differ between editions — the conflict Lab 02 hunts for. */
const EDITIONS = {
  current: {
    file: 'Contoso Expense Policy 2026.docx',
    title: 'Contoso Expense Policy',
    edition: '2026 edition',
    effective: 'Effective 1 January 2026. Supersedes the 2024 edition.',
    status: 'CURRENT',
    mealDomestic: '75',
    mealInternational: '95',
    mileage: '0.67',
    clientMealCap: '150',
    receiptThreshold: '25',
    submitDays: '30',
    taxiPreApproval: '100',
  },
  superseded: {
    file: 'Contoso Expense Policy 2024 (Superseded).docx',
    title: 'Contoso Expense Policy',
    edition: '2024 edition',
    effective: 'Effective 1 January 2024. Superseded by the 2026 edition.',
    status: 'SUPERSEDED',
    mealDomestic: '55',
    mealInternational: '70',
    mileage: '0.58',
    clientMealCap: '120',
    receiptThreshold: '50',
    submitDays: '60',
    taxiPreApproval: '75',
  },
};

const h1 = (text) => new Paragraph({ text, heading: HeadingLevel.HEADING_1, spacing: { before: 320, after: 160 } });
const h2 = (text) => new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 120 } });
const p = (text) => new Paragraph({ children: [new TextRun(text)], spacing: { after: 120 } });
const bullet = (text) => new Paragraph({ children: [new TextRun(text)], bullet: { level: 0 }, spacing: { after: 80 } });

function table(rows) {
  const cell = (text, bold = false) =>
    new TableCell({
      width: { size: 50, type: WidthType.PERCENTAGE },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text, bold })] })],
    });
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: 'BFBFBF' },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: 'BFBFBF' },
      left: { style: BorderStyle.SINGLE, size: 1, color: 'BFBFBF' },
      right: { style: BorderStyle.SINGLE, size: 1, color: 'BFBFBF' },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'DDDDDD' },
      insideVertical: { style: BorderStyle.SINGLE, size: 1, color: 'DDDDDD' },
    },
    rows: rows.map(([a, b], i) =>
      new TableRow({ children: [cell(a, i === 0), cell(b, i === 0)], tableHeader: i === 0 })
    ),
  });
}

function build(e) {
  return new Document({
    creator: 'Contoso Ltd. (fictional)',
    title: `${e.title} — ${e.edition}`,
    description: DISCLAIMER,
    sections: [{
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: DISCLAIMER, size: 15, color: '808080', italics: true })],
          })],
        }),
      },
      children: [
        new Paragraph({
          children: [new TextRun({ text: 'CONTOSO LTD.', bold: true, size: 20, color: '767171' })],
          spacing: { after: 80 },
        }),
        new Paragraph({
          children: [new TextRun({ text: e.title, bold: true, size: 44 })],
          spacing: { after: 80 },
        }),
        new Paragraph({
          children: [new TextRun({ text: `${e.edition} · ${e.status}`, size: 24, color: '767171' })],
          spacing: { after: 80 },
        }),
        p(e.effective),

        h1('1. Purpose and scope'),
        p('This policy sets out what Contoso reimburses when an employee spends their own money on company business, and what evidence is required. It applies to all employees and contractors of Contoso Ltd. and its subsidiaries worldwide.'),
        p('This policy does not cover payroll, leave, benefits or relocation. Those are governed separately by the People team.'),

        h1('2. Approval authority'),
        table([
          ['Amount', 'Approver'],
          ['Up to USD 500', 'Line manager'],
          ['USD 501 to USD 5,000', 'Department head'],
          ['Above USD 5,000', 'Finance Director'],
        ]),
        new Paragraph({ text: '', spacing: { after: 160 } }),
        p('Approval must be obtained before the expense is incurred wherever practicable. Retrospective approval is at the approver\'s discretion and must be justified in writing.'),

        h1('3. Travel'),
        h2('3.1 Air and rail'),
        bullet('Economy class for all flights under six hours.'),
        bullet('Premium economy is permitted for flights of six hours or more with department head approval.'),
        bullet('Standard class rail. First class is permitted only where it is cheaper than the standard fare booked on the day.'),
        h2('3.2 Ground transport'),
        p('Taxis and ride-share services (including Uber and Lyft) are reimbursable for business travel. This explicitly includes journeys between home or office and the airport or station, and between the airport and the hotel or meeting location.'),
        bullet(`No pre-approval is required for a single ground transport journey up to USD ${e.taxiPreApproval}. Above that figure, obtain line manager approval.`),
        bullet('Your ordinary daily commute between home and your regular office is not reimbursable.'),
        bullet('Where a scheduled shuttle or public transport option is available and adds less than 30 minutes to the journey, please use it.'),

        h1('4. Meals while travelling'),
        p(`The daily meal allowance is USD ${e.mealDomestic} per person per day for domestic travel and USD ${e.mealInternational} per person per day for international travel. The allowance covers all meals and non-alcoholic drinks for a full day away from your normal place of work.`),
        bullet('The allowance is a cap, not a per diem. Claim what you actually spent, up to the cap.'),
        bullet('Alcohol is not reimbursable under this section. See section 6 for client entertainment.'),
        bullet('Where a meal is provided as part of a conference or by a hotel, reduce the day\'s claim accordingly.'),

        h1('5. Mileage'),
        p(`Where you use your own vehicle for business travel, Contoso reimburses USD ${e.mileage} per mile. This rate covers fuel, wear and insurance; fuel receipts are not separately reimbursable.`),
        bullet(`Mileage claims must be submitted within ${e.submitDays} days of the journey.`),
        bullet('Record the date, start and end point, total miles, and the business purpose.'),
        bullet('Parking and tolls incurred on a business journey are reimbursable in addition to mileage, with receipts.'),
        bullet('Travel between your home and your regular office does not qualify.'),

        h1('6. Client meals and entertainment'),
        p('A meal with a client, prospect or partner is classified as a Business Meal, not as Entertainment. The distinction matters for tax treatment and for which approval applies.'),
        table([
          ['Category', 'Treatment'],
          ['Business Meal — a meal where business is discussed', `Reimbursable up to USD ${e.clientMealCap} per attendee, including alcohol served with the meal. Line manager approval.`],
          ['Entertainment — events, shows, sporting fixtures, golf', 'Requires written VP approval before the event. Food and drink invoiced separately from the event may be claimed as a Business Meal.'],
        ]),
        new Paragraph({ text: '', spacing: { after: 160 } }),
        p('For any Business Meal claim you must record the names of all attendees, the organisation each represents, and the business purpose of the meeting. A claim without attendee names will be returned.'),

        h1('7. Receipts and deadlines'),
        bullet(`An itemised receipt is required for any single item of USD ${e.receiptThreshold} or more.`),
        bullet(`All claims must be submitted within ${e.submitDays} days of the date the expense was incurred.`),
        bullet('Card statements are not accepted in place of an itemised receipt.'),
        bullet('Where a receipt has been lost, complete the Missing Receipt Declaration and have it countersigned by your line manager.'),

        h1('8. Exceptions'),
        p('Any expense that falls outside this policy requires written approval from the Finance Director before it is incurred. Exceptions are recorded and reviewed quarterly by the Audit Committee.'),
        p('Questions about this policy should go to the Contoso Finance Shared Service desk.'),
      ],
    }],
  });
}

const outDir = process.argv[2];
if (!outDir) {
  console.error('Usage: node scripts/make-lab-docs.mjs <output-dir>');
  process.exit(1);
}

for (const e of Object.values(EDITIONS)) {
  const buffer = await Packer.toBuffer(build(e));
  const path = join(outDir, e.file);
  writeFileSync(path, buffer);
  console.log(`${path}  (${buffer.length} bytes)`);
}
