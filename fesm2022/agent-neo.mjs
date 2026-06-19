import * as i0 from '@angular/core';

// Build artifact import
import '../vendor/agent-neo.js'; 

export class AgentComponent {
  config;
  context;
  user;
  preset;
}

AgentComponent.ɵfac = function AgentComponent_Factory(t) { return new (t || AgentComponent)(); };
AgentComponent.ɵcmp = i0.ɵɵdefineComponent({
  type: AgentComponent,
  selectors: [["agent-neo-component"]],
  inputs: { config: "config", context: "context", user: "user", preset: "preset" },
  standalone: true,
  features: [i0.ɵɵStandaloneFeature],
  decls: 1,
  vars: 4,
  consts: [[3, "config", "context", "user", "preset"]],
  template: function AgentComponent_Template(rf, ctx) {
    if (rf & 1) {
      i0.ɵɵelement(0, "agent-neo", 0);
    }
    if (rf & 2) {
      i0.ɵɵproperty("config", ctx.config)("context", ctx.context)("user", ctx.user)("preset", ctx.preset);
    }
  },
  encapsulation: 2
});

(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AgentComponent, [{
        type: i0.Component,
        args: [{
                selector: 'agent-neo-component',
                standalone: true,
                template: `<agent-neo [config]="config" [context]="context" [user]="user" [preset]="preset"></agent-neo>`
            }]
    }], null, { config: [{
            type: i0.Input
        }], context: [{
            type: i0.Input
        }], user: [{
            type: i0.Input
        }], preset: [{
            type: i0.Input
        }] }); })();
