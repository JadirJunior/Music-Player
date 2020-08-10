const express = require('express');
const routes = express.Router();
const api = require('./services/requestsSpotify');

routes.post('/', async (req, res) => {
    try {
        const token = await api.getToken();
        var reqArtist = req.body.artista.split(' ').join('+');
        const artist = await api.getArtist(token, reqArtist);
        const idArtist = artist.artists.items[0].id;
        const albumsArtist = await api.getArtistAlbum(token, idArtist);
        const albumId = albumsArtist.items[0].id;
        
        const urlArtist = `https://open.spotify.com/follow/1/?uri=spotify:artist:${idArtist}&size=detail&theme=light`;
        const urlPlaylist = `https://open.spotify.com/embed/album/${albumId}`;
        const urlImage = albumsArtist.items[0].images[0].url;
        const data = {
            artist: urlArtist,
            playlist: urlPlaylist,
            image: urlImage
        };
        return res.json(data);
    } catch (error) {
        return res.json({erro: 'Ocorreu um erro inesperado, tente novamente(não coloque o nome do artista com acentuação)'});
    }
        
});


module.exports = routes;