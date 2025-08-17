import { createClient } from "contentful";

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

export const fetchStepsWithQuestions = async () => {
  const res = await client.getEntries({ content_type: "step", include: 2 });

  const linkedEntries = res.includes?.Entry || [];
  const entryMap = new Map(linkedEntries.map((e) => [e.sys.id, e]));

  const enrichedSteps = res.items.map((step) => {
    const stepFields = step.fields;

    const resolvedQuestions = (stepFields.questions || []).map((link) => {
      return entryMap.get(link.sys.id);
    });

    return {
      ...step,
      fields: {
        ...stepFields,
        questions: resolvedQuestions,
      },
    };
  });

  return enrichedSteps;
};
