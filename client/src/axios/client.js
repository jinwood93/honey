import axios from 'axios';

const client = axios.create();

export default client;

//리액트에서 client.get('/api/posts')
//웹팩개발 서버가 프록시 역할을 해서
//http://localhost:4000/api/posts에 대신 요청한 뒤
//결과물을 응답`
