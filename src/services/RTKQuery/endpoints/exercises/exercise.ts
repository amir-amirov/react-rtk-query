import { baseApi } from "../../baseApi.ts";
import { Exercise } from "../../types.ts";

export const extendedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExercises: builder.query<Exercise, void>({
      query: () => ({
        url: "/lessons",
        method: "get",
      }),
      providesTags: ["lessons"],
    }),
    createExercise: builder.mutation<Exercise, Exercise>({
      query: (newLesson) => {
        console.log("New lesson: ", newLesson);
        return {
          url: "/lessons",
          method: "post",
          data: newLesson,
        };
      },
      invalidatesTags: ["lessons"],
    }),
    updateExercise: builder.mutation<Exercise, { id: string; data: Exercise }>({
      query: ({ id, data }) => ({
        url: `/lessons/${id}`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: ["lessons"],
    }),
    deleteExercise: builder.mutation<void, string>({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["lessons"],
    }),
  }),
});

export const {
  useGetExercisesQuery,
  useCreateExerciseMutation,
  useUpdateExerciseMutation,
  useDeleteExerciseMutation,
} = extendedApi;
