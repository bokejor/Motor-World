import jwt_decode from 'jwt-decode'

export const state = () => ({
  isAuth: false,
  currentToken: null,
  loggedUser: null,
  Ad: [],
  AllArticles: [""],
  UserArticles:[],
  brandSelected:[]

})
export const actions = {
  login(context) {
    let token = window.localStorage.token || null
    context.commit('setCurrentToken', token)
  },
  logout(context) {
    window.localStorage.removeItem("token");
    context.commit('setCurrentToken')
  },
  async getAllArticles(context){
  try {
    let response = await this.$axios.get("http://localhost:8082/post");
    console.log(response);
    context.commit('setAllArticles', response.data)
  } catch (err) {
    console.log(err);
    console.log("no se conecta", err.response);
  }
},
async getBrand(context, payload){
  try {
     let brand = await this.$axios.get(
       `http://localhost:8082/post/filter-brand`,
       );
     console.log("respuesta", brand.data);
    context.commit('setBrand')
   } catch (err) {
     console.log("no se conecta", err.response.data.error);
     Swal.fire({
       icon: "error",
       title: "Oops...",
       text: "La marca que buscas no se encuentra!",
     });
   }
},
  async getArticlePublish(context){
    let config = {
       headers: {
         Authorization: `Bearer ${window.localStorage.getItem("token")}`,
       },
     };
   try {
     let response = await this.$axios.get("http://localhost:8082/publish", config);
     console.log(response);
     context.commit('setArticlePublish', response.data)

   } catch (err) {
     console.log(err);
     console.log("no se conecta", err.response);
   }
  },
  async deleteMoto(context, payload){
    let config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };
  try {
    let response = await this.$axios.delete(`http://localhost:8082/post/${payload.id}`, config);
    console.log(response);
    // cuando se elimina en lugar de llamar a la mutación setArticlePublish, llamamos al método que
    // cargará todos los artículos publicados por usuario
    context.dispatch('getArticlePublish')
  } catch (err) {
    console.log(err);
    console.log("no se conecta", err.response);
  }
},
async editMoto(context, payload){
  let config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
try {
  let response = await this.$axios.put(`http://localhost:8082/post/${payload.id}`, config);
  console.log(response);
  context.dispatch('getArticlePublish')
} catch (err) {
  console.log(err);
  console.log("no se conecta", err.response);
}
},

}

export const mutations = {
  setCurrentToken(state, token = null) {
    state.currentToken = token

    console.info(state.isAuth)
    if (token) {
      state.loggedUser = jwt_decode(token)
      console.log(state.loggedUser)
      this.$axios.setHeader('Authorization', 'Bearer' + state.currentToken)
      state.isAuth = true
    }
    if (!token) {
      state.loggedUser = null
      state.currentToken = null
      delete this.$axios.defaults.headers.common["Authorization"]
      state.isAuth = false
    }
  },
  setArticlePublish(state, articles){
    state.UserArticles = articles
  },
  setAllArticles(state, all){
    state.AllArticles = all
  },
  setBrand(state, brand){
    state.brandSelected = brand
  }

}
