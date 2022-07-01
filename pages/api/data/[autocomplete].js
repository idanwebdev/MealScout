import axios from 'axios'

export default function handler(req, res) {
    const { autocomplete } = req.query
    if(autocomplete != '') {
        axios.get(`https://api.spoonacular.com/food/ingredients/autocomplete?query=${autocomplete}&apiKey=${process.env.NEXT_PUBLIC_AUTOCOMPLETE_API_KEY}`)
        .then((result) => {
          res.send(result.data)
        })
        .catch((err) => {
          return err
        })
      }
}