import r2wc from '@r2wc/react-to-web-component';
import Agent from './Agent';

/**
 * Registers the Agent component as a Custom Element <agent-neo-element>.
 * This allows the component to be used in Angular, Vue, or Vanilla JS.
 */
export const registerAgentNeo = () => {
  if (typeof window !== 'undefined' && !customElements.get('agent-neo')) {
    const WebAgent = r2wc(Agent, {
      props: {
        config: 'json',
        context: 'string',
        user: 'json',
      },
    });
    customElements.define('agent-neo', WebAgent as any);
    console.log('Agent Neo: <agent-neo> custom element registered.');
  }
};
