export const testUsers = {
  validUser: {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
  },
  newUser: {
    name: 'Test User',
    username: 'testuser',
    email: 'testuser@example.com',
    phone: '1-770-736-8031',
    website: 'test.org',
  },
  updateUser: {
    name: 'Updated User Name',
    username: 'updateduser',
    email: 'updated@example.com',
  },
};

export const testPosts = {
  validPost: {
    id: 1,
    userId: 1,
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  },
  newPost: {
    title: 'Test Post Title',
    body: 'This is a test post body content for testing purposes.',
    userId: 1,
  },
  updatePost: {
    title: 'Updated Post Title',
    body: 'This is the updated post body content.',
    userId: 1,
  },
};

export const apiEndpoints = {
  users: '/users',
  posts: '/posts',
  comments: '/comments',
  albums: '/albums',
  photos: '/photos',
  todos: '/todos',
};
