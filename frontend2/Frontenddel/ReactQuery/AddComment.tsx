/*
function AddComment({ id }) {
    // this doesn't really do anything yet
    const addComment = useMutation({
      mutationFn: (newComment) =>
        axios.post(`/posts/${id}/comments`, newComment),
        onSuccess: () => {
      // ✅ refetch the comments list for our blog post
      queryClient.invalidateQueries({
        queryKey: ['posts', id, 'comments']
      })
    },
    })
  
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault()
          // ✅ mutation is invoked when the form is submitted
          addComment.mutate(
            new FormData(event.currentTarget).get('comment')
          )
        }}
      >
        <textarea name="comment" />
        <button type="submit">Comment</button>
      </form>
    )
  }

  //------------

  const useUpdateTitle = (id) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newTitle) =>
      axios
        .patch(`/posts/${id}`, { title: newTitle })
        .then((response) => response.data),
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: (newPost) => {
      // ✅ update detail view directly
      queryClient.setQueryData(['posts', id], newPost)
    },
  })
}
  */