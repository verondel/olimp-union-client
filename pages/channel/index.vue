<template>
  <v-row no-gutters>
    <v-col class="sidebar-channels" md="3">
    <v-container id="channels">  
      <div>
      <template>
        <v-tabs vertical v-model="chatId">
          <v-tab v-for="(item, channel_num) in items" :key="channel_num"
            v-on:click = "channel_id=channel_num; isOpenedChat = true; channel_id_func(channel_num, room_num)"
            v-model="channel_id"
          >
            {{ item.text }} <!-- @click названия каналов -->
          </v-tab>
        </v-tabs>
      </template>
      </div>
    </v-container>
    </v-col>

    <v-col class="rooms-col" md="9">
    <div>
    <v-card class="pa-2" outlined tile flat> 
      <v-tabs-items v-model="chatId"> 
        <v-tab-item v-for="(item, i) in items" :key="i">
          <v-card class="pa-2 black--text" outlined tile flat>
            <v-btn class="ma-2" outlined fab normal color="primary black--text"
                v-for="(value, room_num) in items[channel_id].rooms" :key="value.title" 
                    v-on:click = "chat_id = room_num; isOpenedChat = true; chat_func(channel_id, room_num)"
                    @click="uploadChatHistory(chat_id, channel_id)"   
            >
              {{ value.title }} <!--@click названия комнат -->
            </v-btn>
          </v-card>
        </v-tab-item>
      </v-tabs-items> 

      <v-container>
        <template> 
          <div>
            <v-layout class="chat-messages" id="chat-messages" v-if="isOpenedChat" column>
              <div class="message-row" v-for="(msg, i) in msgs" :key="i">
                <v-avatar>
                  <img v-if="getUser(msg.user_id).img" :src="getUser(msg.user_id).img" :alt="getUserName(msg.user_id)">
                  <v-icon v-else x-large color="#525252">mdi-face-man</v-icon>
                </v-avatar>
                <v-card class="message-card rounded-lg" @click="quote = msg">
                  <span class="user-name" :style="{color: getUserColor(msg.user_id)}">{{ getUserName(msg.user_id) }}</span>
                  <div class="quote" v-if="msg.quote">
                    <span class="user-name" :style="{color: getUserColor(msg.quote.user_id)}">{{ getUserName(msg.quote.user_id) }}</span>
                    <p class="message-text">{{ msg.quote.text }}</p>
                  </div>
                  <div class="user-message">
                    <p class="message-text">{{ msg.text }}</p>
                    <span class="message-time">{{ msg.time | time }}</span>
                  </div>
                </v-card>
              </div>
            </v-layout>

            <div class="message-send">
              <v-layout class="message-send-quote" v-if="quote">
                  <v-btn depressed plain x-small @click="quote = null">
                    <v-icon>mdi-window-close</v-icon>
                  </v-btn>
                  <v-flex class="quote">
                  <span class="user-name" :style="{color: getUserColor(quote.user_id)}">{{ getUserName(quote.user_id) }}</span>
                  <p class="message-text">{{ quote.text }}</p>
                  </v-flex>
              </v-layout>

              <v-layout>
                <v-flex grow>
                  <v-text-field class="border-lt" v-model="newMessage" autocomplete="off" hide-details dense outlined @focus="isOpenedChat = true" />
                </v-flex>
                <v-btn class="message-send-btn right-col border-lt" :disabled="!newMessage" outlined @click="sendMessage(chat_id)">
                  <svg class="message-send-icon" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.57558 14.7708V11.5199C5.57558 11.4335 5.59791 11.35 5.63877 11.2766L1.6045 9.88185C1.18876 9.73812 1.14785 9.16626 1.5389 8.96481L16.0693 1.47947C16.443 1.28694 16.8731 1.61357 16.7879 2.02526L14.1268 14.8871C14.0618 15.2012 13.7222 15.3737 13.4303 15.241L8.81976 13.1453C8.62789 13.0581 8.40194 13.1006 8.25482 13.2515L6.43362 15.1198C6.12053 15.441 5.57558 15.2193 5.57558 14.7708Z" fill="white"/>
                    <path d="M7.10921 11.785L1.6045 9.88185C1.18876 9.73812 1.14785 9.16626 1.5389 8.96481L16.0693 1.47947C16.443 1.28694 16.8731 1.61357 16.7879 2.02526L14.1268 14.8871C14.0618 15.2012 13.7222 15.3737 13.4303 15.241L8.81976 13.1453C8.62789 13.0581 8.40194 13.1006 8.25482 13.2515L6.43362 15.1198C6.12053 15.441 5.57558 15.2193 5.57558 14.7708V11.5199C5.57558 11.3575 5.65449 11.2051 5.78718 11.1114L8.5517 9.15941C9.03848 8.81569 9.61029 9.45878 9.21202 9.90203L7.6445 11.6466C7.51012 11.7961 7.29923 11.8507 7.10921 11.785Z" stroke="#8282FF"/>
                  </svg>
                </v-btn>
              </v-layout>
            </div>
          </div>
        </template>
      </v-container> 
    </v-card>
    </div>
    </v-col>  
  </v-row>
  </template>
  
  <script>
import users from '@/models/users';   
import { async } from 'q';
// import { channel } from 'diagnostics_channel';
  export default {
    computed: {
      msgChats() {
        return this.tempChats;
      }
    },
  
    watch: {
      chatId(){
        this.quote = null;
      },
    },
  
    created: function () {
      console.log("Starting connection to WebSocket Server")
      console.log(this.currentUserId);
      var client_id = this.currentUserId;
      this.connection = new WebSocket(`ws://localhost:8000/ws/${client_id}`)
      this.connection.onopen = function(event) {
        console.log(event)
        console.log("Successfully connected to the websocket server")
        }
      },

    data() {
      return {
        name: "Chat", 
        tempChats: [
      // Канал 1
          {
            id: 1,
            user_id: 1,
            channel_id: 0,
            chat_id: 0,
            text: 'Ура! Я пишу в канале 1',
            parent_id: null,
            time: '2022-04-22 10:03'
          },
          {
            id: 2,
            user_id: 2,
            channel_id: 0,
            chat_id: 0,
            text: 'комната 1 =)',
            parent_id: 1 , 
            time: '2022-04-23 12:10'
          },
          {
            id: 3,
            user_id: 2,
            channel_id: 0,
            chat_id: 1,
            text: 'Канал 1. Room 2',
            parent_id: null,
            time: '2022-04-23 10:10'
          },      
          {
            id: 4,
            user_id: 1,
            channel_id: 0,
            chat_id: 2,
            text: 'Канал 1. Room 3',
            parent_id: null,
            time: '2022-04-23 10:10'
          },
          {
            id: 5,
            user_id: 2,
            channel_id: 0,
            chat_id: 3,
            text: 'Канал 1. Room 4',
            parent_id: null,
            time: '2022-04-23 10:10'
          },
      // Канал 2
          {
            id: 6,
            user_id: 1,
            channel_id: 1,
            chat_id: 0,
            text: 'Канал 2. Room 1',
            parent_id: null,
            time: '2022-04-23 17:12'
          },
          {
            id: 7,
            user_id: 2,
            channel_id: 1,
            chat_id: 1,
            text: 'Канал 2. Room 2',
            parent_id: null,
            time: '2022-04-23 17:13'
          },
          {
            id: 8,
            user_id: 1,
            channel_id: 1,
            chat_id: 2,
            text: 'Канал 2. Room 3',
            parent_id: null,
            time: '2022-04-23 17:00'
          },
          {
            id: 9,
            user_id: 2,
            channel_id: 1,
            chat_id: 3,
            text: 'Канал 2. Room 4',
            parent_id: null,
            time: '2022-04-23 17:10'
          },
          
      // Канал 3
          {
            id: 10,
            user_id: 1,
            channel_id: 2,
            chat_id: 0,
            text: 'Канал 3. Room 1',
            parent_id: null,
            time: '2022-04-23 17:12'
          },
          {
            id: 11,
            user_id: 2,
            channel_id: 2,
            chat_id: 1,
            text: 'Канал 3. Room 2',
            parent_id: null,
            time: '2022-04-23 17:12'
          },
          {
            id: 12,
            user_id: 1,
            channel_id: 2,
            chat_id: 2,
            text: 'Канал 3. Room 3',
            parent_id: null,
            time: '2022-04-23 17:12'
          }
          ],
  
        items: [
          { id_channel: 0, text: 'Канал 1',
            rooms: [ 
              {id: 1, title: 'r1'},
              {id: 2, title: 'r2'},
              {id: 3, title: 'r3'},
              {id: 4, title: 'r4'},
            ]   
          },
          { id_channel: 1, text: 'Канал 2',
            rooms: [ 
              {id: 1, title: 'r1'},
              {id: 2, title: 'r2'},
              {id: 3, title: 'r3'},
              {id: 4, title: 'r4'},
            ]       
          },
          { id_channel: 2, text: 'Канал 3', 
            rooms: [ 
              {id: 1, title: 'r1'},
              {id: 2, title: 'r2'},
              {id: 3, title: 'r3'},
              {id: 4, title: 'r4'},
              {id: 5, title: 'r5'},
            ] 
          },
          { id_channel: 3, text: 'Канал 4', 
            rooms: [ 
              {id: 1, title: 'r1'},
              {id: 2, title: 'r2'},
              {id: 3, title: 'r3'},
              {id: 4, title: 'r4'},
            ] 
          },
          { id_channel: 4, text: 'Канал 5', 
            rooms: [ 
              {id: 1, title: 'r1'},
              {id: 2, title: 'r2'},
              {id: 3, title: 'r3'},
              {id: 4, title: 'r4'},
              {id: 5, title: 'r5'},
            ] 
          },
          { id_channel: 5, text: 'Канал 6', 
            rooms: [ 
              {id: 1, title: 'r1'},
              {id: 2, title: 'r2'},
              {id: 3, title: 'r3'},
              {id: 4, title: 'r4'},
            ] 
          },
        ],

        chatHist:
          {'0_0': false, '0_1': false, '0_2': false,'0_3': false, '0_4': false,
          '1_0': false, '1_1': false, '1_2': false, '1_3': false, '1_4': false,
          '2_0': false, '2_1': false, '2_2': false, '2_3': false, '2_4': false,
          '3_0': false, '3_1': false, '3_2': false, '3_3': false, '3_4': false,
          '4_0': false, '4_1': false, '4_2': false, '4_3': false, '4_4': false,
          '5_0': false, '5_1': false, '5_2': false, '5_3': false, '5_4': false,
          },
        channel_id: 0,
        chatId: null,
        room_num: 1,
        newMessage: '',
        msgs: [],
        isOpenedChat: false, 
        quote: null,
        currentUserId: Math.floor(Math.random() * users.length) + 1,
        }
      },
  
    methods: {
      chat_func(channel_id, room_number) {
        let chat_id = room_number;
        this.quote = null;
        this.getChatMessages(channel_id, chat_id);
        return 0;
      },

      channel_id_func(channel_id, room_num) {
        this.chat_func(channel_id, --room_num);
      },

      getChatMessages(channel_id, chat_id) {
        let foobar =  this.msgChats.filter(chat => chat.channel_id === channel_id); 
        let msgs = foobar.filter(chat => chat.chat_id === chat_id);    
        msgs.forEach(msg => {
          if(msg.parent_id) {
            let parent_msg = msgs.find(item => item.id === msg.parent_id);
            msg.quote = {};
            msg.quote.user_id = parent_msg.user_id;
            msg.quote.text = parent_msg.text;
          }
        });
        this.msgs = msgs;
      },
  
      getUser(user_id) {
        return users.find(user => user.id === user_id);
      },
  
      getUserName(user_id) {
        const user = this.getUser(user_id);
        return [user.name, user.surname].join(' ');
      },
  
      getUserColor(user_id) {
        return this.getUser(user_id).color;
      },
  
      sendMessage(chat_id) {
        let channel_id = this.channel_id;
        let msg_new = {
          id: this.msgChats.length + 1,
          user_id: this.currentUserId,
          channel_id: channel_id,
          chat_id: chat_id,
          text: this.newMessage,
          parent_id: null,
          time: this.$moment().format('YYYY-MM-DD HH:MM')
        };
        let msg_new_rest = {
        data: {
          id_msg: this.msgChats.length + 1,
          channel_room_id: `${channel_id}_${chat_id}`,
          user_id: this.currentUserId,
          msg_text: this.newMessage, 
          dt_msg: this.$moment().format('YYYY-MM-DD HH:MM')
          },
        };
        if(this.quote) {
          msg_new.parent_id = this.quote.id;
          this.quote = null;
        }
        this.msgChats.push(msg_new);
        let msg_new_rest_ws = JSON.stringify(msg_new_rest);
        this.connection.send(msg_new_rest_ws);
  
        setTimeout(function(){
          document.getElementById('chat-messages').scrollTop = 1000;
        }, 0);
  
        this.newMessage = '';
        this.getChatMessages(channel_id, chat_id);
      },

      uploadChatHistory(chat_id, channel_id) {
        var channel_room_id = `${channel_id}_${chat_id}`;
        if (this.chatHist[channel_room_id] == false) {
          this.connection.send(`hist:${channel_room_id}`)
          this.chatHist[channel_room_id] = true;
        } 
        else if (this.chatHist[channel_room_id] == true) {
          this.connection.send(`rab:${channel_room_id}`)
        };
        var self = this
        this.connection.onmessage = function(event) {
          let data = JSON.parse(event.data);
          for (let value of Object.values(data)) {
            let history_msg = {
              id: value['id_msg'],
              user_id: value['user_id'],
              channel_id: channel_id,
              chat_id: chat_id,
              text: value['msg_text'],
              parent_id: null,
              time: value['dt_msg']
            };
            var double_msg = 0;
            for (let i = 0; i < self.msgChats.length; i++){
              if (self.msgChats[i]["id"] == history_msg["id"]){
                double_msg++;
              };
            };
            if (double_msg == 0){
              self.msgChats.push(history_msg);
            };  
          };
          self.getChatMessages(channel_id, chat_id);
        };
      },
    },
  
    filters: {
      time: data => data.split(' ')[1]
    },
  } 
  </script>
  
  
  <style lang="scss">
    .chats {
    
      .v-tabs-bar {
        height: 30px;
      }
    
      .chat-title {
        font-size: 16px;
        letter-spacing: normal;
        text-transform: none;
        padding: 0;
      }
    }
    
    .chat-messages {
      min-height: 60vh;
      overflow-y: scroll;
      padding: 20px 10px;
      background: #eeeeee;
    
      &::-webkit-scrollbar {
        width: 5px;
        height: 8px;
      }
    
      &::-webkit-scrollbar-thumb {
        background: #aaa;
        border-radius: 4px;
      }
    
      .message-row {
        display: flex;
        align-items: flex-end;
    
        &:not(:last-of-type) {
          margin-bottom: 20px;
        }
      }
    
      .v-avatar {
        margin-right: 10px;
      }
    
      .message-card {
        flex: 1 1 auto;
        width: 100px;
        padding: 3px 10px 5px;
        border-bottom-left-radius: 0 !important;
        cursor: pointer;
    
        .message-time {
          font-family: $ff;
          font-size: 12px;
          color: #afafaf;
          position: absolute;
          bottom: 0;
          right: 5px;
        }
      }
    }
    
    // .event-edit {
      .user-name {
        font-size: 14px;
        font-family: $ff-bold;
      }
    
      .message-text {
        line-height: 1.2;
        color: #000;
        margin-bottom: 0;
      }
    
      .quote {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        padding-left: 10px;
        border-left: 2px solid;
        margin-bottom: 10px;
        color: #3914AF;
        
    
        .message-text {
          font-size: 14px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          margin: 0px;
        }
      }
    // }
    
    .message-send {
      margin-top: 15px;
    
      .message-send-btn {
        position: relative;
    
        &::before {
          display: none;
        }
    
        .message-send-icon {
          width: 25px;
          height: 25px;
        }
      }
    }

    .message-send-quote {
      .v-icon {
        &::before {
          color: gray !important;
        }
      }
    }
    </style>