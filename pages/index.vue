<template>
  <section id="posts">
    <PostPreview
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :title="post.title"
      :excerpt="post.previewText"
      :thumbnail-image="post.thumbnailUrl"
    />
  </section>
</template>

<script>
import PostPreview from '@/components/Blog/PostPreview'
export default {
  components: {
    PostPreview
  },
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories', {
        version: context.isDev ? 'draft' : 'published',
        starts_with: 'blog/'
      })
      .then(res => {
        // console.log(res.data.stories)
        return {
          posts: res.data.stories.map((bp) =>{
            return {
              id: bp.slug,
              title: bp.content.title,
              previewText: bp.content.summary,
              thumbnailUrl: bp.content.thumbnail
            }
          })
        }
      })
  },
  // data() {
  //   return {
  //     posts: [
  //       {
  //         title: 'A new beginning',
  //         previewText: "This will be awesome, don't miss it!",
  //         thumbnailUrl:
  //           'https://tinylaptop.net/wp-content/uploads/2016/12/best-laptop-for-programming.jpg',
  //         id: 'a-new-beginning'
  //       },
  //       {
  //         title: 'A second beginning',
  //         previewText: "This will be awesome, don't miss it!",
  //         thumbnailUrl:
  //           'https://tinylaptop.net/wp-content/uploads/2016/12/best-laptop-for-programming.jpg',
  //         id: 'a-second-beginning'
  //       }
  //     ]
  //   }
  // }
}
</script>

<style scoped>
#posts {
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
}

@media (min-width: 35rem) {
  #posts {
    flex-direction: row;
  }
}
</style>
