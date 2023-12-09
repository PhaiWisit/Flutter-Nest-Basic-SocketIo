import 'dart:async';

import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart' as io;

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Socket.IO Flutter',
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  late io.Socket socket;
  late StreamController<List<String>> _messageStreamController;
  List<String> messages = [];

  @override
  void initState() {
    super.initState();

    _messageStreamController = StreamController<List<String>>.broadcast();

    socket = io.io('http://192.168.1.104:3000', <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': false,
    });

    socket.on('getMessages', (data) {
      messages.add(data.toString());
      _messageStreamController.add(messages);
    });

    socket.connect();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Socket.IO Flutter'),
      ),
      body: StreamBuilder<List<String>>(
        stream: _messageStreamController.stream,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return ListView.builder(
              itemCount: snapshot.data!.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text(snapshot.data![index]),
                );
              },
            );
          } else {
            return Center(
              child: CircularProgressIndicator(),
            );
          }
        },
      ),
    );
  }

  @override
  void dispose() {
    socket.disconnect();
    _messageStreamController.close();
    super.dispose();
  }
}
