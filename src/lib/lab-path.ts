export interface LabPathModule {
  id: string;
  order: number;
  requires: string[];
}

/**
 * Expands requested capabilities with prerequisites, then returns one stable
 * dependency-safe sequence. Shelf order breaks ties between independent labs.
 */
export function resolveLabPath<T extends LabPathModule>(
  modules: T[],
  requested: Iterable<string>
): T[] {
  const byId = new Map(modules.map((module) => [module.id, module]));
  const needed = new Set(requested);
  const queue = [...needed];

  while (queue.length) {
    const current = byId.get(queue.pop()!);
    for (const requirement of current?.requires ?? []) {
      if (!needed.has(requirement)) {
        needed.add(requirement);
        queue.push(requirement);
      }
    }
  }

  const ordered: T[] = [];
  const placed = new Set<string>();
  const pending = [...needed]
    .map((id) => byId.get(id))
    .filter((module): module is T => !!module)
    .sort((a, b) => a.order - b.order);

  while (pending.length) {
    const next = pending.findIndex((module) =>
      module.requires.every((requirement) => !needed.has(requirement) || placed.has(requirement))
    );
    const [taken] = pending.splice(next === -1 ? 0 : next, 1);
    ordered.push(taken);
    placed.add(taken.id);
  }

  return ordered;
}