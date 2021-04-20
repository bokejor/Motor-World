import jwt_decode from 'jwt-decode'
import Swal from "sweetalert2";

export const state = () => ({
  isAuth: false,
  currentToken: null,
  loggedUser: null,
  Ad: [],
  AllArticles: [],
  OnePost: [],
  Configuration: [],
  InfoMotos:[],
  UserArticles:[],
  ModelsByBrand:[],
  FavoritesMotos:[],
  FavoritesArticles:[],
})

export const actions = {

  login(context) {

    let token = window.localStorage.token || null
    context.commit('setCurrentToken', token)

    context.dispatch('getAllFavorites')

  },

  logout(context) {

    window.localStorage.removeItem("token");
    context.commit('setCurrentToken')

  },
  /************************************
  **** Acción de búsqueda de motos ****
  *************************************/
  async getFilters (context, payload){

    try {

      let filter = await this.$axios.get(
        `http://localhost:8083/motos/filters`,
        { params: {
          brand: payload.brandSelected,
          priceA: payload.priceA,
          priceB: payload.priceB,
          type: payload.typeSelected,
          displacementA: payload.displacementA,
          displacementB: payload.displacementB} }
        );

      console.log("respuesta", filter.data);
      context.commit('setInfoMotos', filter.data)



    } catch (err) {

      console.log("no se conecta", err.response.data.error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La marca que buscas no se encuentra!",
      });

    }
  },
  async getInfoMotos(context){
    
    try {

      let response = await this.$axios.get("http://localhost:8083/motos");

      context.commit('setInfoMotos', response.data)      

    }catch (err) {

      console.log(err);
      console.log("no se conecta", err.response);

    }

  },
  /************************************
  **** Acción de favoritos ************
  *************************************/
  async updateFavorite(context, payload){

    let config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    const isMoto = payload.isMoto;

    try {

      let response = await this.$axios.put(
        `http://localhost:8083/favorites/${payload.id}`, {isMoto},
        config
      );

      console.log("respuesta", response.data);

      this.$router.push("/myFavorites");

    } catch (err) {

      console.log(err)
      console.log("no se conecta", err.response);
    }
  },

  async deleteFavorite(context, payload) {

    let config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`
      }
    };

    try {
      let response = await this.$axios.delete(
        `http://localhost:8083/favorites/${payload.id}`,
        config
      );

      context.dispatch('getAllFavorites')

      Swal.fire({
        icon: "success",
        title: "ok...",
        text: "se ha eliminado correctamente!",
      });

    } catch (err) {

      console.log(err)
      console.log("no se conecta", err.response);
    }
  },

  async getAllFavorites(context){

    let config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    try {
      let response = await this.$axios.get("http://localhost:8083/favorites", config);

      console.log("Motos",response.data[0].motoId);
      console.log("Post",response.data[0].postId);
      context.commit('setFavorites', response.data[0].motoId);
      context.commit('setFavoritesArticles', response.data[0].postId);

    } catch (err) {

      console.log(err);
      console.log("no se conecta", err.response);
    }

  },  
  /**************************************
  **** Configuraciones *****************
  *************************************/

  async getConfiguration(context){

    let config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    try {
      let response = await this.$axios.get("http://localhost:8083/config", config);

      console.log("repuesta",response.data[0]);      
      context.commit('setConfiguration', response.data[0]);
      

    } catch (err) {

      console.log(err);
      console.log("no se conecta", err.response);
    }

  },  


 /************************************
  **** Acción de Anuncios ************
  *************************************/
  async savePost(context, payload) {

    let config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    const formData = payload.formData
   
    try {
        let response = await this.$axios.post("http://localhost:8083/post", formData, config);
        console.log("respuesta", response.data);
        this.$router.push("/");
      } catch (e) {
        console.log("Mensaje: ", e.response.data.error);
        Swal.fire({
          title: "Oops...",
          text: e.response.data.error,
        });        
      }      
  },  
  async editPost(context, payload){

    let config = {
       headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${window.localStorage.getItem("token")}`,
      }
    };

    const formData = payload.formData

    try {
      let response = await this.$axios.put(`http://localhost:8083/post/${payload.id}`, formData, config);
      console.log("respuesta", response.data);
      this.$router.push("/");    
    } catch (e) {
      console.log("Mensaje: ", e.response.data.error);
      Swal.fire({
        title: "Oops...",
        text: e.response.data.error,
      });  
          
    }     
  },
  async getAllPost(context){

    try {

      let response = await this.$axios.get("http://localhost:8083/post");

      console.log(response);
      context.commit('setAllArticles', response.data)      


    } catch (err) {

      console.log(err);
      console.log("no se conecta", err.response);

    }
  },
  async deletePost(context, payload){

    let config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    try {

      let response = await this.$axios.delete(`http://localhost:8083/post/${payload.id}`, config);

      console.log(response);  
      context.dispatch('getArticlePublish')


    } catch (err) {

      console.log(err);
      console.log("no se conecta", err.response);

    }
  },
  async readPost (context, payload){

    let config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };    

    try {

      let response = await this.$axios.get(`http://localhost:8083/post/${payload.id}`, config);

      console.log(response.data);
      context.commit('readPost', response.data);
      this.$router.push("/Ad"); 

    } catch (err) {

      console.log(err);
      console.log("no se conecta", err.response);

    }
  },
  async cleanPost (context){
      context.commit('readPost', "");
      this.$router.push("/Ad");       
  },
  async getArticlePublish(context){


    let config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    try {

      let response = await this.$axios.get("http://localhost:8083/publish", config);

      console.log(response);
      context.commit('setArticlePublish', response.data)

     

    } catch (err) {

      console.log(err);
      console.log("no se conecta", err.response);
    }
  },
   

 /************************************
  **** COMPARADOR **************
  *************************************/

  async añadirOne(context, payload) {

    try {

      let modelMoto = await this.$axios.get(
        `http://localhost:8083/comparador/${payload.modelSelected1}`
      );

      context.commit('setModel', modelMoto.data)
      console.log("respuesta-------------", modelMoto.data);

    } catch (err) {

      console.log("no se conecta", err.response.data.error);
    }
  },
}

/* MUTACIONES */
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
  setConfiguration(state, config){
    state.Configuration = config
  },
  setArticlePublish(state, articles){
    state.UserArticles = articles
  },
  setAllArticles(state, all){
    state.AllArticles = all
  },
  readPost (state, post){
    state.OnePost = post
  }, 
  setInfoMotos(state, info){
    state.InfoMotos = info
  },
  setModels(state, models){
    state.ModelsByBrand = models
  },
  setFavorites(state, favorites){
    state.FavoritesMotos = favorites
  },
  setFavoritesArticles(state, favoritesArticles){
    state.FavoritesArticles = favoritesArticles

  }
}
