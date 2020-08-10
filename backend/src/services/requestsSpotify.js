const request = require('request-promise-native');
const baseUrl = 'https://api.spotify.com/v1';

module.exports = { 
    getToken: async () => { 
        const credentials = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');
        const accessData = await request({
        method: 'POST',
        uri: 'https://accounts.spotify.com/api/token',
        headers: {
            authorization: `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials',
        json: true
        });
        return accessData.access_token;
    },
    getArtist: async (token, reqArtist) => {
        const artist = await request({
            method: 'GET',
            uri: `${baseUrl}/search?q=${reqArtist}&type=artist`,
            headers: {
                authorization: `Bearer ${token}`,
            },
            json: true
        });
        return artist;
    },
    getArtistAlbum: async (token, idArtist) => {
        const artistAlbum = await request({
            method:'GET',
            uri: `${baseUrl}/artists/${idArtist}/albums/?country=BR&limit=1&include_groups=album`,
            headers: {
                authorization: `Bearer ${token}`,
            },
            json:true
        });
        return artistAlbum;
    }
}