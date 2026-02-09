export const registerAgentNeo = async () => {
  const mod: any = await import('./loader');
  if (mod?.defineCustomElements) {
    mod.defineCustomElements(window);
  }
};
