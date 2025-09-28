"use strict";

const word_trend = document.getElementById("word_trends");
const country_trend = document.getElementById("country_trends");
const compare_trend = document.getElementById("compare_trends");
const choose_country = document.getElementById("choose_country");
const search_buttons = document.getElementById("serch_buttons");
const select_country = document.getElementById("country_label_select");

select_country.onchange = () => {
    get_choose_country(select_country.value);
}

choose_country.style.display = "none";

word_trend.onclick = () => {
    choose_country.style.display = "none";
    search_buttons.style.display = "";
}

country_trend.onclick = () => {
    choose_country.style.display = "";
    search_buttons.style.display = "none";
}

let save_res_data;

const countries = [
    "アルゼンチン", "アメリカ合衆国", "イギリス", "イタリア", "インド", "インドネシア", "ウクライナ", "ウルグアイ",
    "エクアドル", "エジプト", "エストニア", "オーストラリア", "オーストリア", "オランダ", "カナダ", "カンボジア",
    "ガーナ", "カタール", "ガボン", "ギリシャ", "キプロス", "キルギス", "グアテマラ", "グリーンランド", "クロアチア",
    "ケニア", "コスタリカ", "コロンビア", "コンゴ共和国", "サウジアラビア", "サモア", "サンマリノ", "サントメ・プリンシペ",
    "シエラレオネ", "シンガポール", "スウェーデン", "スイス", "スロバキア", "スロベニア", "スリランカ", "スーダン",
    "スリナム", "スペイン", "セーシェル", "セルビア", "セントクリストファー・ネーヴィス", "セントビンセント・グレナディーン",
    "セントルシア", "ソロモン諸島", "タイ", "タンザニア", "チュニジア", "チリ", "ツバル", "デンマーク", "ドイツ",
    "ドミニカ共和国", "トーゴ", "トリニダード・トバゴ", "トルクメニスタン", "トルコ", "ナウル", "ナイジェリア", "ナミビア",
    "ニカラグア", "ニジェール", "ニュージーランド", "ノルウェー", "ハイチ", "バーレーン", "バングラデシュ", "バヌアツ",
    "バチカン市国", "パキスタン", "パナマ", "パラオ", "パプアニューギニア", "パラグアイ", "ハンガリー", "フィジー",
    "フィリピン", "フィンランド", "フランス", "ブラジル", "ブルガリア", "ブルネイ・ダルサラーム", "ベトナム", "ベラルーシ",
    "ベネズエラ", "ペルー", "ポーランド", "ポルトガル", "プエルトリコ", "ホンジュラス", "香港", "マカオ", "マダガスカル",
    "マラウイ", "マレーシア", "マルタ", "ミャンマー", "モーリシャス", "モザンビーク", "モルディブ", "モルドバ", "モナコ",
    "モンゴル", "モンテネグロ", "ネパール", "オマーン", "日本", "ヨルダン", "カザフスタン", "韓国", "クウェート", "ラオス"
  ];

const countries_codes = [
    "AR", "US", "GB", "IT", "IN", "ID", "UA", "UY",
    "EC", "EG", "EE", "AU", "AT", "NL", "CA", "KH",
    "GH", "QA", "GA", "GR", "CY", "KG", "GT", "GL", "HR",
    "KE", "CR", "CO", "CG", "SA", "WS", "SM", "ST",
    "SL", "SG", "SE", "CH", "SK", "SI", "LK", "SD",
    "SR", "ES", "SC", "RS", "KN", "VC", "LC", "SB", "TH",
    "TZ", "TN", "CL", "TV", "DK", "DE", "DO", "TG",
    "TT", "TM", "TR", "NR", "NG", "NA", "NI", "NE",
    "NZ", "NO", "HT", "BH", "BD", "VU", "VA", "PK",
    "PA", "PW", "PG", "PY", "HU", "FJ", "PH", "FI",
    "FR", "BR", "BG", "BN", "VN", "BY", "VE", "PE",
    "PL", "PT", "PR", "HN", "HK", "MO", "MG", "MW",
    "MY", "MT", "MM", "MU", "MZ", "MV", "MD", "MC",
    "MN", "ME", "NP", "OM", "JP", "JO", "KZ", "KR", "KW", "LA"
]

const api_URL = "http://localhost:8080/";

async function get_main_trend() {
    try {
        const res = await fetch(`${api_URL}youtube/main_trend/data`);
        const data = await res.json();
        save_res_data = data;
        console.log(data);
        put_html();
    } catch (error) {
        console.error("エラー", error);
    }
}

async function get_choose_country (country) {
    try {
        const index = countries.indexOf(country);
        const code = countries_codes[index];

        if (code === "") {
            return;
        }
        const req = await fetch(`${api_URL}youtube/country_trend/data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ country: code }),
        });

        const res = await req.json();
        save_res_data = res;
        put_html();
        console.log(res);
    } catch (error) {
        console.error("エラー", error);
    }
}

async function search_trend() {
    try {
        const req_text = document.getElementById("search_text").value;
        if (req_text === "") {
            return;
        }

        const req = await fetch(`${api_URL}youtube/key_word_trend/data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ keyword: req_text }),
        });

        const res = await req.json();
        const change_res = res_trend_ranking(res);
        
        save_res_data = change_res;
        put_html();
        console.log(change_res);
    } catch (error) {
        console.error("エラー", error);
    }
}

function res_trend_ranking(res) {
    const now = new Date();

    const ranking = res.map(item => {
        const view_count = parseInt(item.view_count || "0", 10);
        const like_count = parseInt(item.like_count || "0", 10);
        const comment_count = parseInt(item.comment_count || "0", 10);

        const post_date = new Date(item.post_date);
        const hours_since_post = Math.max((now - post_date) / (1000 * 60 * 60), 1);

        const view_speed = view_count / hours_since_post;

        const engagement = view_count > 0 ? (like_count + comment_count) / view_count : 0;

        const age_days = hours_since_post / 24;
        const recency = 1 / (age_days + 0.5);

        const score = (view_speed * 0.6) + (engagement * 0.25) + (recency * 0.15);

        return {
            ...item,
            score,
        };
    });

    ranking.sort((a, b) => b.score - a.score);

    return ranking;
}

function put_html () {
    const display_items = document.getElementById("display_items");
    const ul = document.createElement("ul");

    for (let i = 0; i < save_res_data.length; i++) {
        const li = document.createElement("li");
        const video_image = document.createElement("img");
        const video_title = document.createElement("span");
        const video_url = document.createElement("a");
        const video_channel = document.createElement("a");
        const video_view_count = document.createElement("span");
        const video_like_count = document.createElement("span");
        const video_comment_count = document.createElement("span");

        const eye_icon = document.createElement("ion-icon");
        eye_icon.name = "eye-outline";
        eye_icon.id = "icon";

        const heart_icon = document.createElement("ion-icon");
        heart_icon.name = "heart-outline";
        heart_icon.id = "icon";

        const chatbox_icon = document.createElement("ion-icon");
        chatbox_icon.name = "chatbox-ellipses-outline";
        chatbox_icon.id = "icon";

        video_image.src = save_res_data[i].image;
        video_image.id = "video_image";
        video_title.innerHTML = save_res_data[i].title;
        video_title.id = "video_title";
        video_url.innerHTML = "動画を見る";
        video_url.href = save_res_data[i].url;
        video_url.id = "video_url";
        video_url.target = "_blank";
        video_channel.innerHTML = "チャンネルを見る";
        video_channel.href = save_res_data[i].channel;
        video_channel.id = "video_channel";
        video_channel.target = "_blank";
        if (save_res_data[i].view_count === "") {
            video_view_count.innerHTML = "0";
        } else {
            video_view_count.innerHTML = save_res_data[i].view_count;
        }
        video_view_count.id = "video_view_count";
        if (save_res_data[i].like_count === "") {
            video_like_count.innerHTML = "0";
        }else {
            video_like_count.innerHTML = save_res_data[i].like_count;
        }
        video_like_count.id = "video_like_count";
        if (save_res_data[i].comment_count === "") {
            video_comment_count.innerHTML = "0";
        } else {
            video_comment_count.innerHTML = save_res_data[i].comment_count;
        }
        video_comment_count.id = "video_comment_count";

        video_view_count.prepend(eye_icon);
        video_like_count.prepend(heart_icon);
        video_comment_count.prepend(chatbox_icon);
        li.appendChild(video_image);
        li.appendChild(video_title);
        li.appendChild(video_url);
        li.appendChild(video_channel);
        li.appendChild(video_view_count);
        li.appendChild(video_like_count);
        li.appendChild(video_comment_count);

        ul.appendChild(li);
    }
    display_items.innerHTML = "";
    display_items.appendChild(ul);
}

function input_countries () {
    const country_label_select = document.getElementById("country_label_select");
    for (let i = 0; i < countries.length; i++) {
        const option = document.createElement("option");
        option.value = countries[i];
        option.text = countries[i];
        country_label_select.appendChild(option);
    }
}

input_countries();
get_main_trend();