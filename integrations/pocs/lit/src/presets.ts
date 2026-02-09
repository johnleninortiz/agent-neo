import type { AppConfig } from './types';

export const presets: Record<string, Partial<AppConfig>> = {
  reporting: {
    actionLabel: 'Create ACFR Report',
    systemRole:
      'a financial reporting expert assistant. You assist users in creating Annual Comprehensive Financial Reports (ACFR) and Budget Books.',
    initialStepId: 'welcome',
    intents: [
      { keywords: ['ACFR', 'comprehensive', 'financial'], nextStepId: 'acfr_confirm' },
      { keywords: ['Budget', 'Book', 'budgetary'], nextStepId: 'budget_confirm' },
      { keywords: ['templates', 'themes', 'show me', 'list'], nextStepId: 'help' },
      { keywords: ['open', 'last', 'report'], nextStepId: 'open_last_report_flow' },
      { keywords: ['permissions', 'Please give edit permissions for Guilad', 'edit permissions'], nextStepId: 'update_permissions_demo' }
    ],
    endpoints: [
      {
        name: 'openReport',
        url: '',
        method: 'GET',
        description:
          'Usage: Call this to OPEN a report given its ID. Useful when user asks to open/view a report.',
        payloadTemplate: { id: '' }
      },
      {
        name: 'manageAccess',
        url: '',
        method: 'GET',
        description: 'Usage: Call this to manage access/permissions for a report.',
        payloadTemplate: { id: '' }
      }
    ],
    workflow: [
      {
        id: 'welcome',
        message: "Hello {{ userName }}! I'm your assistant. What kind of report to do want to do today?",
        options: [
          { label: 'ACFR', nextStepId: 'acfr_confirm' },
          { label: 'Budget Book', nextStepId: 'budget_confirm' },
          { label: 'Im not sure', nextStepId: 'help' }
        ]
      },
      {
        id: 'fallback_sorry',
        message:
          "Sorry, I still can't help you with that, but looking forward to improve! \n\nIs there anything else I can help you with?",
        options: [
          { label: 'Create ACFR Report', nextStepId: 'acfr_confirm' },
          { label: 'Create Budget Book', nextStepId: 'budget_confirm' }
        ]
      },
      {
        id: 'acfr_confirm',
        message: 'Alright! I can help you with the ACFR report. Would you like to use the default template?',
        options: [
          {
            label: "Ok, let's do it",
            payloadKey: 'type',
            value: 'ACFR',
            stateUpdate: { themeId: '697b977d5f3a5717430c12b8' },
            nextStepId: 'ask_report_name_acfr'
          },
          { label: 'Show me the templates', actionType: 'api', triggerAction: 'getThemes', nextStepId: 'select_theme_acfr' },
          { label: 'Im not sure', nextStepId: 'help' }
        ]
      },
      {
        id: 'budget_confirm',
        message: 'Alright! I can help you with the Budget Book report. Would you like to use the default template?',
        options: [
          {
            label: "Ok, let's do it",
            payloadKey: 'type',
            value: 'BUDGET_BOOK',
            nextStepId: 'ask_report_name_budget'
          },
          { label: 'Show me the templates', actionType: 'api', triggerAction: 'getThemes', nextStepId: 'select_theme_budget' },
          { label: 'Im not sure', nextStepId: 'help' }
        ]
      },
      {
        id: 'ask_report_name_acfr',
        message: 'What should be the name of your ACFR report?',
        inputTarget: 'reportName',
        nextStepId: 'ask_fiscal_year_acfr'
      },
      {
        id: 'ask_fiscal_year_acfr',
        message: 'Please enter the fiscal year for this report (YYYY-MM-DD):',
        inputTarget: 'fiscalYear',
        triggerAction: 'createReport',
        actionType: 'api',
        payloadKey: 'initialReportFields.fiscalYear',
        fixedPayload: {
          type: 'ACFR',
          name: '{{reportName}}',
          initialReportFields: {
            themeId: '{{themeId}}',
            themeColors: {
              primaryColor: '#DC143C',
              headingColor: '#0D0E1C',
              secondaryColor: '#FFE4E8',
              tertiaryColor: '#8B0A1E'
            }
          }
        },
        nextStepId: 'done'
      },
      {
        id: 'ask_report_name_budget',
        message: 'What should be the name of your Budget Book?',
        inputTarget: 'reportName',
        nextStepId: 'ask_fiscal_year_budget'
      },
      {
        id: 'ask_fiscal_year_budget',
        message: 'Please enter the fiscal year for this report (YYYY-MM-DD):',
        inputTarget: 'fiscalYear',
        triggerAction: 'createReport',
        actionType: 'api',
        payloadKey: 'initialReportFields.fiscalYear',
        fixedPayload: {
          type: 'BUDGET_BOOK',
          name: '{{reportName}}',
          initialReportFields: {
            themeId: '{{themeId}}',
            themeColors: {
              primaryColor: '#DC143C',
              headingColor: '#0D0E1C',
              secondaryColor: '#FFE4E8',
              tertiaryColor: '#8B0A1E'
            }
          }
        },
        nextStepId: 'done'
      },
      {
        id: 'select_theme_acfr',
        message: "I've found {{ result.length }} templates. Which theme would you like for your ACFR report?",
        useResultsAsOptions: true,
        dynamicOptionsConfig: {
          labelKey: 'name',
          valueKey: 'id',
          payloadKey: 'themeId',
          nextStepId: 'ask_report_name_acfr',
          fixedPayload: { type: 'ACFR' }
        }
      },
      {
        id: 'select_theme_budget',
        message: "I've found {{ result.length }} templates. Which theme would you like for your Budget Book?",
        useResultsAsOptions: true,
        dynamicOptionsConfig: {
          labelKey: 'name',
          valueKey: 'id',
          payloadKey: 'themeId',
          nextStepId: 'ask_report_name_budget',
          fixedPayload: { type: 'BUDGET_BOOK' }
        }
      },
      {
        id: 'help',
        message: "Don't know what to do? Want to talk to a real human?",
        options: [
          { label: 'Show me the templates', actionType: 'api', triggerAction: 'getThemes', nextStepId: 'select_theme_general' },
          { label: 'Talk to a human', actionType: 'whatsapp', nextStepId: 'whatsapp_done' }
        ]
      },
      {
        id: 'select_theme_general',
        message: "I've found {{ result.length }} templates. You can pick one and I'll start a general report for you:",
        useResultsAsOptions: true,
        dynamicOptionsConfig: {
          labelKey: 'name',
          valueKey: 'id',
          payloadKey: 'themeId',
          nextStepId: 'ask_report_name_acfr',
          fixedPayload: { type: 'ACFR' }
        }
      },
      {
        id: 'done',
        message: '✅ Perfect! Your report request has been sent.',
        options: [
          { label: 'Open Report', triggerAction: 'openReport', actionType: 'api', value: '{{result.id}}', payloadKey: 'id' },
          { label: 'Manage Access/Permissions', triggerAction: 'manageAccess', actionType: 'api', value: '{{result.id}}', payloadKey: 'id' }
        ]
      },
      {
        id: 'whatsapp_done',
        message: 'Opening WhatsApp to connect you with our help desk... 🚀'
      },
      {
        id: 'open_last_report_flow',
        message: 'Finding your last report...',
        triggerAction: 'getAllReports',
        actionType: 'api',
        nextStepId: 'display_last_report'
      },
      {
        id: 'display_last_report',
        message: "Here is the last report I found: '{{result[0].name}}'.",
        options: [
          { label: 'Open Report', triggerAction: 'openReport', actionType: 'api', value: '{{result[0].id}}', payloadKey: 'id' },
          { label: 'Check Activity Log', actionType: 'link', externalLink: '/settings/activity-log' }
        ]
      },
      {
        id: 'update_permissions_demo',
        message: 'Report permissions have been updated for the user gholender@cleargov.com',
        triggerAction: 'manageAccess',
        actionType: 'api',
        fixedPayload: { userEmail: 'gholender@cleargov.com' }
      }
    ]
  },
  chess: {
    actionLabel: 'New Game',
    systemRole: 'a Chess Grandmaster. You analyze the board state provided in context to give strategic advice.',
    initialStepId: 'welcome',
    intents: [
      { keywords: ['move', 'play', 'game', 'start'], nextStepId: 'new_game_flow' },
      { keywords: ['analyze', 'help', 'hint'], nextStepId: 'analyze' }
    ],
    workflow: [
      {
        id: 'welcome',
        message:
          "Welcome to Grandmaster 3D! I'm {{agentName}}, your chess assistant. \n\nI can help you analyze moves or start a new match.",
        options: [
          { label: '🎮 Start New Game', nextStepId: 'new_game_flow' },
          { label: '⚖️ Difficulty Levels', nextStepId: 'difficulty_info' },
          { label: '🌅 Backgrounds', nextStepId: 'background_info' },
          { label: '💬 Tell me more', nextStepId: 'chess_about' }
        ]
      },
      {
        id: 'new_game_flow',
        message: "Great! Let's get a game going. First, what should I call you?",
        inputTarget: 'playerName',
        nextStepId: 'select_difficulty'
      },
      {
        id: 'select_difficulty',
        message: 'Nice to meet you, {{playerName}}! What difficulty level would you like?',
        options: [
          { label: 'Beginner (Level 1)', actionType: 'api', triggerAction: 'setDifficulty', value: 1, payloadKey: 'level', nextStepId: 'confirm_start' },
          { label: 'Intermediate (Level 4)', actionType: 'api', triggerAction: 'setDifficulty', value: 4, payloadKey: 'level', nextStepId: 'confirm_start' },
          { label: 'Grandmaster (Level 7)', actionType: 'api', triggerAction: 'setDifficulty', value: 7, payloadKey: 'level', nextStepId: 'confirm_start' }
        ]
      },
      {
        id: 'confirm_start',
        message: 'Perfect. I\'ve set the difficulty to Level {{level}}. Ready to play?',
        options: [
          { label: "Let's Play!", actionType: 'api', triggerAction: 'newGame', nextStepId: 'game_started' },
          { label: 'Change Settings', nextStepId: 'select_difficulty' }
        ]
      },
      {
        id: 'game_started',
        message: 'Game started! You are playing as White. Good luck, {{playerName}}! ♟️'
      },
      {
        id: 'difficulty_info',
        message:
          'We have 7 difficulty levels powered by Stockfish. Level 1 is perfect for beginners, while Level 7 is at Grandmaster strength.',
        options: [{ label: 'Back', nextStepId: 'welcome' }]
      },
      {
        id: 'background_info',
        message:
          'You can use the Appearance tab to switch between City, Sunset, Forest, Night, and Studio environments.',
        options: [{ label: 'Back', nextStepId: 'welcome' }]
      },
      {
        id: 'chess_about',
        message:
          'This app is built with React, Three.js, and Stockfish.js. Ask me for a hint if you get stuck!',
        options: [{ label: 'Back', nextStepId: 'welcome' }]
      },
      {
        id: 'analyze',
        message: "I'm analyzing the board... (This feature connects to the engine in your browser!)",
        options: [{ label: 'Back', nextStepId: 'welcome' }]
      }
    ]
  },
  health: {
    actionLabel: 'Check Vitals',
    systemRole: 'a personal health tracking assistant.',
    initialStepId: 'welcome',
    workflow: [
      {
        id: 'welcome',
        message: 'Health Assistant here. I can help you track vitals or schedule appointments.',
        options: [
          { label: 'Log Vitals', nextStepId: 'log_vitals' },
          { label: 'Schedule Appointment', nextStepId: 'schedule' }
        ]
      }
    ]
  }
};
