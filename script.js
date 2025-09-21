"use strict";

let save_res_data;
const api_URL = "https://youtube-trends-finder.onrender.com/"

async function get_main_trend() {
    try {
        const res = await fetch(`${api_URL}/youtube/main_trend/data`);
        const data = await res.json();
        save_res_data = data;
        console.log(data);
        put_html();
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
        save_res_data = res;
        put_html();
        console.log(res);
    } catch (error) {
        console.error("エラー", error);
    }
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
        video_url.innerHTML = "Go to Video";
        video_url.href = save_res_data[i].url;
        video_url.id = "video_url";
        video_url.target = "_blank";
        video_channel.innerHTML = "Go to Channel";
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

get_main_trend();