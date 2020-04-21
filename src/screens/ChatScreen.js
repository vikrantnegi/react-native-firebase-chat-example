import React, {DependencyList, useEffect, useRef, useState} from 'react';
import {Button, View, Text} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

class ChatScreen2 extends React.Component {
  state = {
    messages: [],
  };

  get uid() {
    const {currentUser} = auth();

    return (currentUser || {}).uid;
  }

  get timestamp() {
    return new Date().getTime();
  }

  get user() {
    return {
      name: this.props.route.params?.userData.name,
      _id: this.props.route.params?.userData.uid,
    };
  }

  get ref() {
    const {currentUser} = auth();

    const uid = (currentUser || {}).uid;

    return database().ref(
      `/messages/${uid}/${this.props.route.params?.userData.uid}`,
    );
  }

  componentDidMount() {
    this.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      })),
    );
  }
  // 2.
  componentWillUnmount() {
    this.ref.off();
  }

  parse = snapshot => {
    const {timestamp: numberStamp, text, user} = snapshot.val();
    const {key: _id} = snapshot;
    const message = {
      _id,
      numberStamp,
      text,
      user,
    };
    return message;
  };

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const {text, user} = messages[i];
      // 4.
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };
  append = message => this.ref.push(message);

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.send}
        user={this.user}
      />
    );
  }
}

// TODO: not working with Hooks
// function ChatScreen({route, navigation}) {
//   const {currentUser} = auth();

//   const ref = database().ref(
//     `/messages/${currentUser.uid}/${route.params?.userData.uid}`,
//   );

//   const [messages, setMessages] = useState([]);

//   const parse = snapshot => {
//     // console.log({snapshot});
//     // 1.
//     const {timestamp, text, user} = snapshot.val();
//     const {key: _id} = snapshot;
//     // 2.
//     // const timestamp = new Date(numberStamp);
//     // 3.
//     const message = {
//       _id,
//       timestamp,
//       text,
//       user,
//     };
//     return message;
//   };

//   function user() {
//     // Return our name and our UID for GiftedChat to parse
//     return {
//       name: route.params?.userData.name,
//       _id: route.params?.userData.uid,
//     };
//   }

//   useEffect(() => {
//     const userMessage = [];

//     ref.limitToLast(20).on('child_added', snapshot => {
//       const {timestamp, text, user} = snapshot.val();
//       const {key: _id} = snapshot;
//       const message = {
//         _id,
//         timestamp,
//         text,
//         user,
//       };

//       userMessage.push(message);
//       // setMessages([...messages, message]);
//     });

//     console.log(userMessage);

//     // (userMessage);

//     return () => {
//       ref && ref.off();
//     };
//   }, [ref]);

//   // useEffect(() => {
//   //   const on = callback =>
//   //     ref
//   //       .limitToLast(20)
//   //       .on('child_added', snapshot => callback(parse(snapshot)));

//   //   on(message => setMessages(prevState => [...prevState, message]));
//   // }, [ref]);

//   // console.log(messages);

//   function timestamp() {
//     return new Date().getTime();
//   }

//   const send = dbMessages => {
//     for (let i = 0; i < dbMessages.length; i++) {
//       const {text, user} = dbMessages[i];
//       // 4.
//       const message = {
//         text,
//         user,
//         timestamp: timestamp(),
//       };

//       ref.push(message);
//     }
//   };

//   // const append = message => ref.push(message);

//   return <GiftedChat onSend={send} user={user()} messages={messages} />;
// }

export default ChatScreen2;
