import { baseApi } from "../../baseApi.ts";
import { Lesson } from "../../types.ts";

export const extendedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessons: builder.query<Lesson, void>({
      query: () => ({
        url: "/lessons",
        method: "get",
      }),
      providesTags: ["lessons"],
    }),
    createLesson: builder.mutation<Lesson, Lesson>({
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
    updateLesson: builder.mutation<Lesson, { id: string; data: Lesson }>({
      query: ({ id, data }) => ({
        url: `/lessons/${id}`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: ["lessons"],
    }),
    deleteLesson: builder.mutation<void, string>({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["lessons"],
    }),
  }),
});

export const {
  useGetLessonsQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = extendedApi;
