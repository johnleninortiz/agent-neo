import r2wc from '@r2wc/react-to-web-component';
import Agent from './Agent';

console.log('Agent Neo: Initializing Web Component...');

const WebAgent = r2wc(Agent, {
  props: {
    config: 'json',
    context: 'string',
    user: 'json',
  },
});

if (!customElements.get('agent-neo')) {
  customElements.define('agent-neo', WebAgent);
  console.log('Agent Neo: <agent-neo> registered successfully. V 1.0.0');
} else {
  console.warn('Agent Neo: <agent-neo> already defined.');
}
