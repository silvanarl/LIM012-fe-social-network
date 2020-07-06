import MockFirebase from 'mock-cloud-firestore';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        post1: {
          id: '38cj45y3BhxiGHsx6pF0XfnJC',
          name: 'mock',
          content: 'post',
          user: '01',
          date: '5/7/2020 18:45:11',
          postPrivate: 'public',
          img: '',
          like: 0,
          arrayLikesUsers: '',
          __collection___: {
            comments: {
              __doc__: {
                comment01: {
                  user: '01',
                  message: 'comentario',
                  idPost: 'post1',
                  date: '5/7/2020 18:45:11',
                  userId: '',
                },
              },
            },
          },
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

// eslint-disable-next-line import/first
import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
  updatePostPrivate,
} from '../src/models/crud.js';

describe('agregar y mostrar post', () => {
  it('Debería agregar un post', done => createPost('01', 'mock', 'post').then(() => {
    const callback = (post) => {
      const result = post.find(Element => Element.post === 'mock');
      expect(result.name).toEqual('mock');
      done();
    };
    getPosts(callback);
  }));

  it('debería poder editar un post', done => updatePost('post1', 'nota editada').then(() => {
    const callback = (post) => {
      const result = post.find(element => element.id === 'post1');
      expect(result.post).toBe('nota editada');
      done();
    };
    getPosts(callback);
  }));

  it('debería poder modificar la privacidad de un post', done => updatePostPrivate('post1', 'private').then(() => getPosts((data) => {
    const result = data.find(post => post.id === 'post1');
    expect(result.data().visibility).toEqual('private');
    done();
  })));
  it('debería poder eliminar un post', done => deletePost('post1').then(() => getPosts((post) => {
    const result = post.find(element => element.id === 'post1');
    expect(result).toBe(undefined);
    done();
  })));
});
