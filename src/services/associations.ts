import BillingCycle from "../models/billingCycle.model";
import Card from "../models/card.model";
import Purchase from "../models/purchase.model";
import Purpose from "../models/purpose.model";
import User from "../models/user.model";

/**
 * User 1<----->M Card
 * An User has many Cards
 * A Card belongs to an User
 */
User.hasMany(Card);
Card.belongsTo(User);

/**
 * Card 1<----->M BillingCycle
 * A Card has many BillingCycles
 * A BillingCycle belongs to a Card
 */
Card.hasMany(BillingCycle);
BillingCycle.belongsTo(Card);

/**
 * Card 1<----->M Purchase
 * A Card has many Purchases
 * A Purchase belongs to a Card
 */
Card.hasMany(Purchase);
Purchase.belongsTo(Card);

/**
 * BillingCycle 1<----->M Purchase
 * A BillingCycle has many Purchases
 * A Purchase belongs to a BillingCycle
 */
BillingCycle.hasMany(Purchase);
Purchase.belongsTo(BillingCycle);

/**
 * Purchase M<----->1 Purpose
 * A Purchase has one Purpose
 * A Purpose belongs to many Purchases
 */
Purpose.hasMany(Purchase);
Purchase.belongsTo(Purpose);

export { BillingCycle, Card, Purchase, Purpose, User };
