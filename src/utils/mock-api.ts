import { createServer } from 'miragejs'

createServer({
  routes() {
    this.post('/auth/login', () => ({     
      body: {
        id: "oPgqAlL0yW384VEaYPEYZB5dKRz6e12D",
        photo: "www.url.com/photo.png",
        username: "test1",
        full_name: "test1234",
        email: "test1@gmail.com",
        phone_code: "",
        phone_number: "",
        address: "",
        created_at: "2020-07-22T10:35:51.914016Z"
      },
      message: "Success"
    }))

    this.get('/user', () => ({
      data: [
        {
          id: 'a098ca86-379c-4dc6-b4a7-8b4cd0d40296',
          username: 'coba',
          firstName: 'coba2',
          lastName: 'last2',
          email: 'coba2@prosa.ai',
        },
      ],
    }))

    this.get(`/user/:id`, () => ({
      data: {
        id: 'a098ca86-379c-4dc6-b4a7-8b4cd0d40296',
        username: 'coba',
        firstName: 'coba2',
        lastName: 'last2',
        email: 'coba2@prosa.ai',
      },
    }))

    this.post(`/user`, () => ({}))

    this.put(`/user/:id`, () => ({}))

    this.delete(`/user/:id`, () => ({}))

    this.get(`/group`, () => ({
      data: [
        {
          id: '89457bc0-3fc7-4d8d-9fab-f57aaebf7454',
          name: 'ITB',
        },
      ],
    }))

    this.get(`/instansi`, () => ({
      data: [
        {
          id: '1',
          kode: 'PNSL',
          nama: 'Panselnas',
        },
      ],
    }))

    this.get('/audit', () => ({
      data: [
        {
          id: 1,
          username: 'Username 1',
          action: 'Esse magna minim fugiat esse amet dolore labore.',
          created_date: '2021-09-23T15:31:42.295277',
        },
      ],
    }))

    this.get('/audit/:id', () => ({
      data: [
        {
          id: 1,
          username: 'Username 1',
          action: 'Esse magna minim fugiat esse amet dolore labore.',
          created_date: '2021-09-23T15:31:42.295277',
        },
      ],
    }))

    this.passthrough()
  },
})
