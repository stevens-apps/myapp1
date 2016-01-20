
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("charge", function(request, response) {
  // Set your secret key: remember to change this to your live secret key in production
  // See your keys here https://dashboard.stripe.com/account/apikeys
  Stripe.apiKey = "sk_test_gbTLQukKCbf32YaWJxE7wtVS";

  // Get the credit card details submitted by the form
  String token = request.getParameter("stripeToken");
  String amount = request.getParameter("amount");

  // Create the charge on Stripe's servers - this will charge the user's card
  try {
    Map<String, Object> chargeParams = new HashMap<String, Object>();
    chargeParams.put("amount", amount); // amount in cents, again
    chargeParams.put("currency", "usd");
    chargeParams.put("source", token);
    chargeParams.put("description", "Example charge");

    Charge charge = Charge.create(chargeParams);
  } catch (CardException e) {
    response.console.error("Card declined");
    // The card has been declined
  }
  response.success("Card Charged");
});
