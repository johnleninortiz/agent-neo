import { AgentNeoElement } from './agent-neo';

export const registerAgentNeo = () => {
  if (!customElements.get('agent-neo')) {
    customElements.define('agent-neo', AgentNeoElement);
  }
  console.log("va bien 003")
};
