import axios from 'axios';

export default {
  methods : {
    Get(url){
      return axios({
        method : "GET",
        url : url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ this.$store.state.jwt }`
        }
      })
    },
    Post(url, payload){
      return axios({
        method : "POST",
        url : url,
        data : payload,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ this.$store.state.jwt }`
        }
      })
    },
    PostData(url, formData){
      return axios({
        method : "POST",
        url : url,
        data : formData,
        headers: {
          'Content-Type': `multipart/form-data;`,
          'Authorization': `Bearer ${ this.$store.state.jwt }`
        }
      })
    },
    Delete(url){

      // return axios.delete(url,{
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${ this.$store.state.jwt }`
      //   }
      // });
      return axios({
        method : "DELETE",
        url : url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ this.$store.state.jwt }`
        }
      })
    },
    Put(url, payload){

      console.log(url, payload);
      return axios({
        method : "PUT",
        url : url,
        data : payload,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ this.$store.state.jwt }`
        }
      })
    }
  }
}