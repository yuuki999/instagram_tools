import 'dotenv/config';
import axios from 'axios';

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_BUSINESS_ACCOUNT_ID = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
const baseUrl = 'https://graph.facebook.com/v20.0';

async function getBusinessAccountInfo(username: string) {
  try {
    const response = await axios.get(`${baseUrl}/${INSTAGRAM_BUSINESS_ACCOUNT_ID}`, {
      params: {
        fields: `business_discovery.username(${username}){username,website,name,ig_id,id,profile_picture_url,biography,follows_count,followers_count,media_count,media{id,caption,like_count,comments_count,timestamp,media_product_type,media_type,permalink}}`,
        access_token: ACCESS_TOKEN
      }
    });

    console.log('Business Account Info:', response.data.business_discovery);

    // メディア情報の表示
    if (response.data.business_discovery.media) {
      console.log('\nRecent Media:');
      response.data.business_discovery.media.data.forEach((media: any, index: number) => {
        console.log(`\nPost ${index + 1}:`);
        console.log(`Caption: ${media.caption}`);
        console.log(`Likes: ${media.like_count}`);
        console.log(`Comments: ${media.comments_count}`);
        console.log(`Posted at: ${new Date(media.timestamp).toLocaleString()}`);
        console.log(`Permalink: ${media.permalink}`);
      });
    }

  } catch (error: any) {
    console.error('Error fetching business account info:', error.response ? error.response.data : error.message);
  }
}

// 使用例
const targetUsername = 'bluebottle';
getBusinessAccountInfo(targetUsername);
