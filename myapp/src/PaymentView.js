// import "react-native-get-random-values";
import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "./AuthProvider";
import { COLORS, SIZES, FONTS, icons } from "../src/constants";
import axios from "axios";
import WebView from "react-native-webview";

const STRIPE_PK =
  "pk_test_51I4aPxE1YW3GJZIEQp2XCu7TqRcPvlWUAgEE51XWMedGjpo84KJpm2LIfsYJFZY0SA5WkIVn0wh7VH59LgzkGMQq00U7AO9dog";

const PaymentView = (props) => {
  const { user } = useContext(AuthContext);

  const { amount, product } = props;

  const onCheckStatus = (response) => {
    props.onCheckStatus(response);
  };

  const htmlContent = `
  
    <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Page</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
          <script src="https://js.stripe.com/v3/"></script>
          <style>
          
          .card-holder{
              display: flex;
              flex-direction: column;
              height: 200px;
              justify-content: space-around;
              background-color: #3D097F;
              border-radius: 20px;
              padding: 10px;
              padding-top: 20px;
              padding-bottom: 20px;
              margin-top: 50px;
              margin-bottom: 50px;
          }
          .card-element{
              height: 100px;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
          }
          .card-name{
              padding: 20;
              color: '#FFF';
              font-weight: 500;
              font-size: '25px';
              background-color: transparent;
              border: none;
          
          }
          input {
              outline:none;
              color: #FFF;
              font-size: '25px';
              font-weight: 500;
              background-color: transparent;
              }
              
              .row{
                  margin-top: '50px';
                  display: flex;
                  flex-direction: row;
                  justify-content: center;
                  align-items: center;
              }
              .products-info{
                  
                  height: 150px;
                  width: 100%;
                  padding: 20px;
                  text-align: center;
              }
              .card-errors{
                  color: red;
              }
              .pay-btn{
                  display: flex;
                  height: 50px;
                  justify-content: center;
                  align-items: center;
              }
          
          </style>
      
      </head>
      <body>
          
          <!-- product info -->
          <div class="container-fluid">
             <!-- <div class="row">
                  <div class="products-info">
                      Product Info: ${product}
                      Amount: ${amount}
                  </div>
              </div> -->
              <div class="row">
                  <label class="card-errors" id="card-errors"></label>
              </div>
      
                  <form>
                      <div class="card-holder">
                              <input type="text" placeholder="Card Holder Name" id="card-name" class="card-name" />
                              <div id="card-element" class="card-element">
                                  <div class="form-group">
                                      <label for="card_number">Carn Number</label>
                                      <input type="text" class="form-control" id="card_number" data-stripe="number">
                                  </div>
                                  <div class="form-row">
                                      <label>
                                          <span>Card number</span>
                                          <input type="text" size="20" data-stripe="number">
                                      </label>
                                  </div> 
                              
                                  <div class="form-row">
                                  <label>
                                      <span>Expiration (MM/YY)</span>
                                      <input type="text" size="2" data-stripe="exp_month">
                                  </label>
                                  <span> / </span>
                                  <input type="text" size="2" data-stripe="exp_year">
                                  </div>
                              
                                  <div class="form-row">
                                  <label>
                                      <span>CVC</span>
                                      <input type="text" size="4" data-stripe="cvc">
                                  </label>
                                  </div>
                              
                                  <div class="form-row">
                                  <label>
                                      <span>Billing Zip</span>
                                      <input type="hidden" size="6" data-stripe="address_zip" value="400012">
                                  </label>
                                  </div>
                              
                                  
                              </div>
                          </div>
                      
                          <div class="pay-btn">
                              <input type="submit" class="btn btn-info btn-lg" value="Add Credit Card" />
                          </div>
          
                  </form>
      
              
          </div>
          
          <script>
              var stripe = Stripe('${STRIPE_PK}');
              var elements = stripe.elements();
      
      
                  var card = elements.create("card", {
                      hidePostalCode: true,
                      style: {
                          base: {
                          color: '#FFF',
                          fontWeight: 500,
                          fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
                          fontSize: '20px',
                          fontSmoothing: 'antialiased',
                          '::placeholder': {
                              color: '#664385',
                          },
                          ':-webkit-autofill': {
                              color: '#e39f48',
                          },
                      },
                      invalid: {
                          color: '#FC011F',
                          '::placeholder': {
                              color: '#FFCCA5',
                          },
                      },
                      }
                  });
                  // Add an instance of the card Element into the 'card-element' <div>.
                  card.mount('#card-element');
                  /**
                   * Error Handling
                   */
                  //show card error if entered Invalid Card Number
                  function showCardError(error){
                      document.getElementById('card-errors').innerHTML = ""
                      if(error){
                          document.getElementById('card-errors').innerHTML = error
                      } 
                  }
                  
                  card.on('change', function(event) {
                      if (event.complete) {
                          showCardError()
                          // enable payment button
                      } else if (event.error) {
                          const { message} = event.error
                          console.log(message)
                          showCardError(message)
                      }
                  });
                  
                  card.mount('#card-element');
                  
                  /**
                   * Payment Request Element
                   */
                  var paymentRequest = stripe.paymentRequest({
                      country: "IN",
                      currency: "inr",
                      total: {
                          amount: ${amount * 100},
                          label: "Total"
                      }
                  });
                  var form =  document.querySelector('form');
                  form.addEventListener('submit', function(e) {
                      e.preventDefault();
      
                      var additionalData = {
                          name: document.getElementById('card-name').value,
                          address_line1: undefined,
                          address_city:  undefined,
                          address_state: undefined,
                          address_zip: undefined,
                      };
                    
                     
                    stripe.createToken(card, additionalData).then(function(result) {
                        console.log(result);
                        if (result.token) {
                            window.postMessage(JSON.stringify(result));
                        } else {
                            window.postMessage(JSON.stringify(result));
                        }
                    });
                      
                  })
          </script>
      </body>
    </html>
  `;

  const injectedJavaScript = `(function() {
        window.postMessage = function(data){
            window.ReactNativeWebView.postMessage(data);
        };
    })()`;

  const onMessage = (event) => {
    const { data } = event.nativeEvent;
    console.log("onMessage", data);
    onCheckStatus(data);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, minHeight: 700, height: 300, opacity: 0.99 }}>
        <WebView
          originWhitelist={["*"]}
          javaScriptEnabled={true}
          style={{ flex: 1 }}
          source={{ html: htmlContent }}
          injectedJavaScript={injectedJavaScript}
          onMessage={onMessage}
        />
      </View>
    </View>
  );

  // const onClick = () => {};

  // return (
  //   <View style={styles.container}>
  //     <View
  //       style={{
  //         flexDirection: "row",
  //         alignItems: "center",
  //         marginBottom: 20,
  //       }}
  //     >
  //       <View>
  //         <MaterialIcon
  //           name="arrow-back-ios"
  //           size={24}
  //           color="gray"
  //           style={{ marginLeft: 20 }}
  //           onPress={() => {
  //             navigation.navigate("BookSession");
  //           }}
  //         />
  //       </View>
  //       <View style={{ left: 20 }}>
  //         <Text style={styles.payment}>Set Your Payment</Text>
  //       </View>
  //     </View>
  //     <View style={styles.action}>
  //       <TextInput
  //         style={{ fontSize: 20 }}
  //         placeholder="Start Typing"
  //         placeholderTextColor="#666"
  //         // onChangeText={(text) => setData({ ...data, rate: text })}
  //         underlineColorAndroid="transparent"
  //       ></TextInput>
  //     </View>
  //     <View>
  //       {/* <Text style={styles.text}>Total: {data.rate} LBP/h</Text> */}
  //     </View>
  //     <View>
  //       <TouchableOpacity style={{ marginTop: 320 }} onPress={() => onClick()}>
  //         <LinearGradient colors={["#ff01ff", "#ffd200"]} style={styles.next}>
  //           <Text style={styles.next_text}>NEXT</Text>
  //         </LinearGradient>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );
};

export default PaymentView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  payment: {
    fontSize: 27,
    fontWeight: "bold",
    color: COLORS.pink,
  },
  action: {
    flexDirection: "row",
    height: 70,
    borderRadius: 40,
    borderWidth: 2,
    marginHorizontal: 20,
    marginVertical: 5,
    borderColor: "#ffd200",
    paddingLeft: 20,
    backgroundColor: "#FFFFFF",
    elevation: 10,
  },
  text: {
    margin: 30,
    fontSize: 30,
    fontWeight: "bold",
  },
  next: {
    marginTop: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    left: "70%",
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    width: "30%",
    height: 70,
    borderColor: "#ffd200",
    borderWidth: 2,
  },
  next_text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
});
