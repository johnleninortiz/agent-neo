#!/bin/bash
set -e

# Configuration
DIST_DIR="dist/angular-wrapper"
mkdir -p $DIST_DIR

echo "📦 Building Angular Wrapper..."

# 1. Create a minimal Angular Library structure
# This mimics the output of 'ng build agent-neo' from the original project
# but wraps the <agent-neo> custom element.

# We assume the React build (agent-neo.js) will be bundled or referenced.
# For simplicity, we will assume the consumer installs 'agent-neo' (this repo)
# and imports the agent-neo.js via side-effects or include it in assets.

# However, to maintain strictly identical API to the original Angular lib:
# We need to export 'AgentComponent' that inputs 'config', 'context', 'user'.

cat > $DIST_DIR/package.json <<EOF
{
  "name": "agent-neo",
  "version": "0.1.0",
  "peerDependencies": {
    "@angular/core": ">=16.0.0",
    "@angular/common": ">=16.0.0"
  },
  "dependencies": {
    "tslib": "^2.3.0"
  },
  "main": "fesm2022/agent-neo.mjs",
  "module": "fesm2022/agent-neo.mjs",
  "es2020": "fesm2022/agent-neo.mjs",
  "esm2020": "fesm2022/agent-neo.mjs",
  "fesm2020": "fesm2022/agent-neo.mjs",
  "fesm2022": "fesm2022/agent-neo.mjs",
  "typings": "index.d.ts",
  "sideEffects": false
}
EOF

# Create definition types
cat > $DIST_DIR/index.d.ts <<EOF
export * from './public-api';
EOF

cat > $DIST_DIR/public-api.d.ts <<EOF
export * from './lib/agent-neo.component';
export * from './lib/types';
EOF

mkdir -p $DIST_DIR/lib
cp src/types.ts $DIST_DIR/lib/types.d.ts

cat > $DIST_DIR/lib/agent-neo.component.d.ts <<EOF
import * as i0 from "@angular/core";
import { AppConfig, User } from './types';

export declare class AgentComponent {
    config: AppConfig;
    context?: string;
    user?: User;
    preset?: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AgentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AgentComponent, "agent-neo-component", never, { "config": { "alias": "config"; "required": false; }; "context": { "alias": "context"; "required": false; }; "user": { "alias": "user"; "required": false; }; "preset": { "alias": "preset"; "required": false; }; }, {}, never, never, true, never>;
}
EOF

# Create FESM Bundle (Flattened ES Module)
mkdir -p $DIST_DIR/fesm2022

# We need to read the React bundle content to inline it or expect it to be loaded?
# Best approach: The Angular Component dynamically loads the script or assumes it's globally available.
# Since we want a single import, let's bundle the React code? 
# No, standard practice for WC wrappers is often just the wrapper.
# But we need to make sure 'agent-neo' element is defined.
# So we import the React loader.

# Since we are not running 'ng-packagr', we are hand-crafting the MJS output.
# This assumes the consumer environment can resolve 'agent-neo' (the react package) to get the JS.
# BUT: 'agent-neo' IS this package. 
# So we likely need to bundle the React JS into this wrapper or have a 'postinstall' that builds it.

# User wants: "unique agent-neo (react project) codebase -> angular / react outputs"
# So the Angular output (branch 'builds/angular') should contain this wrapper + the react bundle?
# OR just the wrapper and it depends on a CDN? 
# "agent-neo knows what to send... build configuration for angular and react... automatically publishes to respective remote branches"

# Strategy: 
# The 'angular' artifact will contain the compiled React code inside it, and the Component will register it.
# We will cat the react build into the FESM file or import it.

cat > $DIST_DIR/fesm2022/agent-neo.mjs <<EOF
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
                template: \`<agent-neo [config]="config" [context]="context" [user]="user" [preset]="preset"></agent-neo>\`
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
EOF

# Copy React Artifacts
mkdir -p $DIST_DIR/vendor
cp dist/agent-neo.standalone.js $DIST_DIR/vendor/agent-neo.js

echo "✅ Angular Wrapper built in $DIST_DIR"
