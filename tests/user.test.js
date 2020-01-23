import "@babel/polyfill/noConflict";
/* eslint-env jest */
import mongoose from "mongoose";

import { mongoString } from ".././src/mongoStringTest";
import { User } from ".././src/models";
let res, otherUserId, mainUserId, mainUser;
const axios = require("axios").default;
const axiosCookieJarSupport = require("axios-cookiejar-support").default;
const tough = require("tough-cookie");

axiosCookieJarSupport(axios);
const cookieJar = new tough.CookieJar();

const conn = async () => {
	return mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true  });
};
conn();

const instance = axios.create({
	withCredentials: true,
	jar: cookieJar
});

describe('testing user resolvers', () => {
  beforeAll(async () => {
    await User.deleteMany()
  })
	describe('register user', () => {
    test('should register user when and then be authenticated', () => {
      res = instance.post('http://localhost:4000/graphql', {
        query: `
        mutation{ 
          signUp(email: "asdf@gmail.com", password: "12345"){
            id
            email
          }
        }
        `
      })
      const sig = res.signUp.email;
      expect(sig).toBe('asdf@gmail.com');
  });
    it('should return true when loggin out', async () => {
      res = await instance.post('http://localhost:4000/graphql', {
        query: `
          mutation{
            signOut
          }
        `
      })
      const { data } = res
      expect(data).toBeTruthy()
    })

    
  })
});
