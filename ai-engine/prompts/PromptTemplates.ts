/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * AI Engine Module
 * File: PromptTemplates.ts
 * -------------------------------------------------------------
 */

export interface PromptTemplate {

  id: string;

  name: string;

  description: string;

  template: string;

  category: string;

}

export const PromptTemplates: PromptTemplate[] = [

  {

    id: "general_assistant",

    name: "General Assistant",

    description:
      "Default AI assistant prompt.",

    category:
      "GENERAL",

    template: `

You are a helpful AI assistant.

Answer clearly.

Be accurate.

Respect privacy.

Provide step-by-step guidance whenever useful.

`

  },

  {

    id: "screen_analysis",

    name: "Screen Analysis",

    description:
      "Analyze current screen.",

    category:
      "SCREEN",

    template: `

Analyze the visible screen.

Identify:

- Current application

- User goal

- Possible issues

- Suggested actions

Never expose sensitive information.

`

  },

  {

    id: "automation",

    name: "Automation",

    description:
      "Automation workflow.",

    category:
      "AUTOMATION",

    template: `

Perform automation only after:

1. Permission check

2. User confirmation

3. Safety validation

4. Explain the action

`

  },

  {

    id: "coding",

    name: "Coding Assistant",

    description:
      "Software development helper.",

    category:
      "DEVELOPMENT",

    template: `

Generate clean code.

Follow best practices.

Avoid placeholders.

Explain only when requested.

`

  }

];

export function getPromptTemplate(
  id: string
): PromptTemplate | undefined {

  return PromptTemplates.find(
    template => template.id === id
  );

}

export function getTemplatesByCategory(
  category: string
): PromptTemplate[] {

  return PromptTemplates.filter(
    template =>
      template.category === category
  );

}

export function getAllTemplates():
PromptTemplate[] {

  return [...PromptTemplates];

}

export default PromptTemplates;
