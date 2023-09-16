import 'package:flutter/material.dart';
// import 'package:firebase_auth/firebase_auth.dart';
import 'package:client/widgets/user_image_picker.dart';
// import 'package:firebase_storage/firebase_storage.dart';
// import 'package:cloud_firestore/cloud_firestore.dart';
import 'dart:io';

// final _firebase = FirebaseAuth.instance;

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  final _form = GlobalKey<FormState>();
  var _isLogin = true;
  var _enteredEmail = '';
  var _enteredPassword = '';
  var _enteredUsername = '';
  File? _selectedImage;
  var _isAuthenticating = false;

  // Future<bool> _checkUsernameExists(String username) async {
  //   final snapshot = await FirebaseFirestore.instance
  //       .collection('users')
  //       .where('username', isEqualTo: username)
  //       .limit(1)
  //       .get();
  //   return snapshot.docs.isNotEmpty;
  // }

  void _submit() async {
    final isValid = _form.currentState!.validate();
    if (!isValid) {
      return;
    }

    // if (!_isLogin && _selectedImage == null) {
    //   ScaffoldMessenger.of(context).clearSnackBars();
    //   ScaffoldMessenger.of(context).showSnackBar(
    //     const SnackBar(
    //       content: Text('Please pick an image.'),
    //     ),
    //   );
    //   return;
    // }
    _form.currentState!.save();
    // try {
    //   setState(() {
    //     _isAuthenticating = true;
    //   });
    //   if (_isLogin) {
    //     await _firebase.signInWithEmailAndPassword(
    //         email: _enteredEmail, password: _enteredPassword);
    //   } else {
    //     final usernameExists = await _checkUsernameExists(_enteredUsername);
    //     if (usernameExists) {
    //       ScaffoldMessenger.of(context).clearSnackBars();
    //       ScaffoldMessenger.of(context).showSnackBar(
    //         const SnackBar(
    //           content: Text(
    //               'Username already exists. Please choose a different one.'),
    //         ),
    //       );
    //       setState(() {
    //         _isAuthenticating = false;
    //       });
    //       return;
    //     }
    //     final userCredentials = await _firebase.createUserWithEmailAndPassword(
    //         email: _enteredEmail, password: _enteredPassword);
    //     final storageRef = FirebaseStorage.instance
    //         .ref()
    //         .child('user_images')
    //         .child('${userCredentials.user!.uid}.jpg');
    //     await storageRef.putFile(_selectedImage!);
    //     final imageURL = await storageRef.getDownloadURL();

    //     await FirebaseFirestore.instance
    //         .collection('users')
    //         .doc(userCredentials.user!.uid)
    //         .set({
    //       'username': _enteredUsername,
    //       'ghusername': _enteredGHUsername,
    //       'ccusername': _enteredCCUsername,
    //       'lcusername': _enteredLCUsername,
    //       'cfusername': _enteredCFUsername,
    //       'email': _enteredEmail,
    //       'image_url': imageURL,
    //     });

    //     await FirebaseFirestore.instance
    //         .collection('rankings')
    //         .doc(userCredentials.user!.uid)
    //         .set({
    //       'ccranking': 0,
    //       'ccstars': '',
    //       'lcranking': 0,
    //       'cfranking': 0,
    //       'cfrank': '',
    //       'ghcontributions': 0,
    //       'lcglobalranking': 0,
    //       'repos': 0
    //     });
    //   }
    // } on FirebaseAuthException catch (error) {
    //   ScaffoldMessenger.of(context).clearSnackBars();
    //   ScaffoldMessenger.of(context).showSnackBar(
    //     SnackBar(
    //       content: Text(error.message ?? 'Authentication failed.'),
    //     ),
    //   );
    //   setState(() {
    //     _isAuthenticating = false;
    //   });
    // }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Column(
          children: [Container(
        height: 300,
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/images/background.png'),
            fit: BoxFit.fill,
          ),
        ),
          ),
          SingleChildScrollView(
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [ 
                  Card(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    margin: const EdgeInsets.all(20),
                    child: Padding(
                      padding: const EdgeInsets.all(20),
                      child: Form(
                        key: _form,
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            if (!_isLogin)
                              UserImagePicker(imagePickFn: (image) {
                                _selectedImage = image;
                              }),
                            TextFormField(
                              keyboardType: TextInputType.emailAddress,
                              decoration: InputDecoration(
                                labelText: 'Email address',
                                border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(16),
                                    borderSide:
                                        BorderSide(color: Colors.grey[300]!)),
                              ),
                              autocorrect: false,
                              textCapitalization: TextCapitalization.none,
                              validator: (value) {
                                if (value!.trim().isEmpty ||
                                    !value.contains('@') ||
                                    !value.contains('.') ||
                                    value.length < 5) {
                                  return 'Please enter a valid email address.';
                                }
                                return null;
                              },
                              onSaved: (value) {
                                _enteredEmail = value!;
                              },
                            ),
                            const SizedBox(height: 12),
                            if (!_isLogin)
                              TextFormField(
                                decoration: InputDecoration(
                                  labelText: 'Username',
                                  border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(16),
                                      borderSide:
                                          BorderSide(color: Colors.grey[300]!)),
                                ),
                                enableSuggestions: false,
                                validator: (value) {
                                  if (value!.trim().isEmpty || value.length < 4) {
                                    return 'Username must be at least 4 characters long.';
                                  }
                                  return null;
                                },
                                onSaved: (value) {
                                  _enteredUsername = value!;
                                },
                              ),
                            const SizedBox(height: 12),
                            TextFormField(
                              decoration: InputDecoration(
                                labelText: 'Password',
                                border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(16),
                                    borderSide:
                                        BorderSide(color: Colors.grey[300]!)),
                              ),
                              obscureText: true,
                              validator: (value) {
                                if (value!.trim().isEmpty || value.length < 6) {
                                  return 'Password must be at least 6 characters long.';
                                }
                                return null;
                              },
                              onSaved: (value) {
                                _enteredPassword = value!;
                              },
                            ),
                            const SizedBox(height: 24),
                            if (_isAuthenticating)
                              const CircularProgressIndicator(),
                            if (!_isAuthenticating)
                              ElevatedButton(
                                onPressed: _submit,
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: Theme.of(context)
                                      .colorScheme
                                      .inversePrimary
                                      .withOpacity(0.8),
                                  padding: const EdgeInsets.symmetric(
                                      horizontal: 48, vertical: 16),
                                ),
                                child: Text(_isLogin ? 'Login' : 'Signup'),
                              ),
                            const SizedBox(height: 12),
                            if (!_isAuthenticating)
                              TextButton(
                                onPressed: () {
                                  setState(() {
                                    _isLogin = !_isLogin;
                                  });
                                },
                                child: Text(_isLogin
                                    ? 'Create new account'
                                    : "Already have an account? Login instead"),
                              ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),],
        ),
      ),
    );
  }
}