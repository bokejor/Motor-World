import jwt_decode from 'jwt-decode'
import Swal from "sweetalert2";

export const state = () => ({
  isAuth: false,
  currentToken: null,
  loggedUser: null,
  Ad: [],
  AllArticles: [],
  InfoMotos:[],
  UserArticles:[],
  ModelsByBrand:[],
  FavoritesMotos:[],
  favoritesArticlesMotos:[]

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
    let response = await this.$axios.get("http://localhost:8083/post");
    console.log(response);
    context.commit('setAllArticles', response.data)
  } catch (err) {
    console.log(err);
    console.log("no se conecta", err.response);
  }
},

async getInfoMotos(context){
  try {
let response = await this.$axios.get("http://localhost:8083/motos");
context.commit('setInfoMotos', response.data)
} catch (err) {
console.log(err);
console.log("no se conecta", err.response);
}
},
async getFilters (context, payload){

  try {

    let filter = await this.$axios.get(
      `http://localhost:8083/motos/filters`, { params: { brand: payload.brandSelected, priceA: payload.priceA, priceB: payload.priceB, type: payload.typeSelected, displacementA: payload.displacementA, displacementB: payload.displacementB} }
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

/* async getBrand(context, payload){
  try {
     let brand = await this.$axios.get(
       `http://localhost:8083/post/filter-brand`,
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
}, */
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
  async deleteMoto(context, payload){
    let config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };
  try {
    let response = await this.$axios.delete(`http://localhost:8083/post/${payload.id}`, config);
    console.log(response);
    // cuando se elimina en lugar de llamar a la mutación setArticlePublish, llamamos al método que
    // cargará todos los artículos publicados por usuario
    context.dispatch('getArticlePublish')
  } catch (err) {
    console.log(err);
    console.log("no se conecta", err.response);
  }
},
async editMoto(payload){
  let config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
try {
  let response = await this.$axios.put(`http://localhost:8083/post/${payload.id}`, config);
  console.log(response);
} catch (err) {
  console.log(err);
  console.log("no se conecta", err.response);
}
},
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
async adToFavorites(context, payload){
    let config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };
    let newFavorite = {
      motoId: payload._id, 
    };
    

      try {
        let response = await this.$axios.post(
          "http://localhost:8083/favorites",
          newFavorite,
          config
        );
        console.log("respuesta", response.data);
        context.commit('setFavorites', response.data)
        this.$router.push("/myFavorites");
      } catch (err) {
        console.log("no se conecta", err.response.data.error);

        this.$router.push("/login");
      }
      return;
  },
  async getAllFavorites(context){
    let config = {
       headers: {
         Authorization: `Bearer ${window.localStorage.getItem("token")}`,
       },
     };
   try {
     let response = await this.$axios.get("http://localhost:8083/favorites", config);
     console.log(response.data);
     context.commit('setFavorites', response.data)

   } catch (err) {
     console.log(err);
     console.log("no se conecta", err.response);
   }
  },
  async deleteFavorite(context, payload) {
    let config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`
      }
    };
     let newFavorite = {};
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
   async adToFavoritesArticles(context, payload){
    let config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };
    let newFavoriteArticle = {
          image:payload.image,
          brand:payload.brand,
          km:payload.km,
          price:payload.price,
          desc:payload.desc,
    };
      try {
        let response = await this.$axios.post(
          "http://localhost:8083/favoritesPost",
          newFavoriteArticle,
          config
        );
        console.log("respuesta", response.data);
        context.commit('setFavoritesArticles', response.data)

        this.$router.push("/myFavorites");
      } catch (err) {
        console.log("no se conecta", err.response);

        this.$router.push("/login");
      }
      return;
  },
  async getAllFavoritesArticles(context){
    let config = {
       headers: {
         Authorization: `Bearer ${window.localStorage.getItem("token")}`,
       },
     };
   try {
     let response = await this.$axios.get("http://localhost:8083/favoritesPost", config);
     console.log(response.data);
     context.commit('setFavorites', response.data)

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
    state.favoritesArticles= favoritesArticles
  }

}
