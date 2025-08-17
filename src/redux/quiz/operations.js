import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchStepsWithQuestions } from "../../services/contentful";

export const fetchSteps = createAsyncThunk(
  "quiz/fetchSteps",
  async (_, thunkAPI) => {
    try {
      const entries = await fetchStepsWithQuestions();

      const steps = entries.map((entry) => {
        const { id } = entry.sys;
        const { title, questions } = entry.fields;

        // const formattedQuestions = (questions || []).map(
        //   (q) => q.fields.text || "Питання без тексту"
        // );

        return {
          id,
          title,
          questions,
        };
      });

      return steps;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
