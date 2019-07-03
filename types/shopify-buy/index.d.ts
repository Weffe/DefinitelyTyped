// Type definitions for shopify-buy 2.5.0
// Project: http://shopify.github.io/js-buy-sdk/api/
// Definitions by: Martin Köhn <https://github.com/openminder>
//                 Stephen Traiforos <https://github.com/straiforos>
//                 Rosana Ruiz <https://github.com/totemika>
//                 Pierre Ortega <https://github.com/PierreAndreis>
//                 Rogelio Negrete <https://github.com/weffe>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.7

/**
 * The JS Buy SDK is a lightweight library that allows you to build ecommerce into any website.
 * It is based on Shopify’s API and provides the ability to retrieve products and collections from your shop,
 * add products to a cart, and checkout.
 * It can render data on the client side or server. This will allow you to add ecommerce functionality to any
 * website or javascript application. This is helpful if you already have a website and need to add ecommerce
 * or only need a simple buy button on your site.
 */

// TODO: Make sure props are null or not
declare namespace ShopifyBuy {
    //
    // Top Level API
    // ----------------------------------------------------------------------
    // Client
    export class Client {
        /**
         * Primary entry point for building a new Client.
         */
        static buildClient(config: Config, fetchFunction?: Function): Client;

        /**
         * The property under which product fetching methods live
         */
        product: ProductResource;

        /**
         * The property under which collection fetching methods live.
         */
        collection: CollectionResource;

        /**
         * The property under which shop fetching and mutating methods live.
         */
        checkout: CheckoutResource;

        /**
         * The property under which shop fetching methods live.
         */
        shop: ShopResource;

        /**
         * The property under which image helper methods live.
         */
        image: ImageResource;

        /**
         * Fetches the next page of models
         * @example
         * client.fetchNextPage(products).then((nextProducts) => {
         *   // Do something with the products
         * });
         */
        fetchNextPage<T>(models: T[]): T[];
    }

    export interface Config {
        /**
         * The `myshopify` domain for the shop (e.g. `graphql.myshopify.com`).
         */
        domain: string;

        /**
         * The {@link https://help.shopify.com/api/reference/storefront_access_token Storefront access token} for the shop.
         */
        storefrontAccessToken: string;
    }

    // Product
    export class ProductResource {
        /**
         * Fetches a single product by ID on the shop.
         *
         * @example
         * client.product.fetch('Xk9lM2JkNzFmNzIQ4NTIY4ZDFi9DaGVja291dC9lM2JkN==').then((product) => {
         *   // Do something with the product
         * });
         */
        fetch(id: string): Promise<Product>;

        /**
         * Fetches all products on the shop.
         *
         * @example
         * client.product.fetchAll().then((products) => {
         *   // Do something with the products
         * });
         */
        fetchAll(pageSize?: number): Promise<Product[]>;

        /**
         * Fetches a single product by handle on the shop.
         *
         * @example
         * client.product.fetchByHandle('my-product').then((product) => {
         *   // Do something with the product
         * });
         */
        fetchByHandle(handle: string): Promise<Product>;

        /**
         * Fetches multiple products by ID on the shop.
         *
         * @example
         * const ids = ['Xk9lM2JkNzFmNzIQ4NTIY4ZDFi9DaGVja291dC9lM2JkN==', 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ='];
         * client.product.fetchMultiple(ids).then((products) => {
         *   // Do something with the products
         * });
         */
        fetchMultiple(ids: string[]): Promise<Product[]>;

        /**
         * Fetches all products on the shop that match the query.
         *
         * @example
         * client.product.fetchQuery({first: 20, sortKey: 'CREATED_AT', reverse: true}).then((products) => {
         *   // Do something with the first 10 products sorted by title in ascending order
         * });
         */
        fetchQuery(query: Query): Promise<Product[]>;

        helpers: ProductHelpers;
    }

    export interface ProductHelpers {
        /**
         * Returns the variant of a product corresponding to the options given.
         *
         * @example
         * const selectedVariant = client.product.helpers.variantForOptions(product, {
         *   size: "Small",
         *   color: "Red"
         * });
         *
         * @param product The product to find the variant on. Must include `variants`.
         * @param options An object containing the options for the variant.
         */
        variantForOptions(product: Product, options: object): ProductVariant;
    }

    // Collection
    export class CollectionResource {
        /**
         * Fetches a single collection by ID on the shop, not including products.
         * To fetch the collection with products use [fetchWithProducts]{@link Client#fetchWithProducts}.
         *
         * @example
         * client.collection.fetch('Xk9lM2JkNzFmNzIQ4NTIY4ZDFiZTUyZTUwNTE2MDNhZjg==').then((collection) => {
         *   // Do something with the collection
         * });
         */
        fetch(id: string): Promise<Collection[]>;

        /**
         * Fetches a single collection by ID on the shop, including products.
         *
         * @example
         * client.collection.fetchWithProducts('Xk9lM2JkNzFmNzIQ4NTIY4ZDFiZTUyZTUwNTE2MDNhZjg==').then((collection) => {
         *   // Do something with the collection
         * });
         */
        fetchWithProducts(id: string): Promise<Collection[]>;

        /**
         * Fetches all collections on the shop, not including products.
         * To fetch collections with products use [fetchAllsWithProducts]{@link Client#fetchAllsWithProducts}.
         *
         * @example
         * client.collection.fetchAll().then((collections) => {
         *   // Do something with the collections
         * });
         */
        fetchAll(pageSize?: number): Promise<Collection[]>;

        /**
         * Fetches all collections on the shop, including products.
         *
         * @example
         * client.collection.fetchAllWithProducts().then((collections) => {
         *   // Do something with the collections
         * });
         */
        fetchAllWithProducts(): Promise<Collection[]>;

        /**
         * Fetches a collection by handle on the shop.
         *
         * @example
         * client.collection.fetchByHandle('my-collection').then((collection) => {
         *   // Do something with the collection
         * });
         */
        fetchByHandle(handle: string): Promise<Collection[]>;

        /**
         * Fetches all collections on the shop that match the query.
         *
         * @example
         * client.collection.fetchQuery({first: 20, sortKey: 'CREATED_AT', reverse: true}).then((collections) => {
         *   // Do something with the first 10 collections sorted by title in ascending order
         * });
         */
        fetchQuery(query: Query): Promise<Collection[]>; // TODO fix to be a type: DOC: Fetches a collection by handle on the shop. Assuming it does not give products
    }

    // Checkout
    export class CheckoutResource {
        /**
         * Creates a checkout.
         *
         * @example
         * const input = {
         *   lineItems: [
         *     {variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yOTEwNjAyMjc5Mg==', quantity: 5}
         *   ]
         * };
         *
         * client.checkout.create(input).then((checkout) => {
         *   // Do something with the newly created checkout
         * });
         */
        create(input?: {
            email?: string;
            lineItems?: LineItemInput[];
            shippingAddress?: MailingAddress;
            note?: string;
            customAttributes?: AttributeInput[];
        }): Promise<Cart>;

        /**
         * Fetches a checkout by ID.
         *
         * @example
         * client.checkout.fetch('FlZj9rZXlN5MDY4ZDFiZTUyZTUwNTE2MDNhZjg=').then((checkout) => {
         *   // Do something with the checkout
         * });
         */
        fetch(id: string): Promise<Cart>;

        /**
         * Adds line items to an existing checkout.
         *
         * @example
         * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
         * const lineItems = [{variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yOTEwNjAyMjc5Mg==', quantity: 5}];
         *
         * client.checkout.addLineItems(checkoutId, lineItems).then((checkout) => {
         *   // Do something with the updated checkout
         * });
         */
        addLineItems(checkoutId: string, lineItems: LineItemInput[]): Promise<Cart>;

        /**
         * Removes line items from an existing checkout.
         *
         * @example
         * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
         * const lineItemIds = ['TViZGE5Y2U1ZDFhY2FiMmM2YT9rZXk9NTc2YjBhODcwNWIxYzg0YjE5ZjRmZGQ5NjczNGVkZGU='];
         *
         * client.checkout.removeLineItems(checkoutId, lineItemIds).then((checkout) => {
         *   // Do something with the updated checkout
         * });
         */
        removeLineItems(checkoutId: string, lineItemIds: string[]): Promise<Cart>;

        /**
         * Updates line items on an existing checkout.
         *
         * @example
         * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
         * const lineItems = [
         *   {
         *     id: 'TViZGE5Y2U1ZDFhY2FiMmM2YT9rZXk9NTc2YjBhODcwNWIxYzg0YjE5ZjRmZGQ5NjczNGVkZGU=',
         *     quantity: 5,
         *     variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yOTEwNjAyMjc5Mg=='
         *   }
         * ];
         *
         * client.checkout.updateLineItems(checkoutId, lineItems).then(checkout => {
         *   // Do something with the updated checkout
         * });
         */
        updateLineItems(checkoutId: string, lineItems: LineItemInput[]): Promise<Cart>;

        /**
         * Remove all line items from cart
         */
        clearLineItems(checkoutId: string | number, lineItems: LineItemInput[]): Promise<Cart>;

        /**
         * Replace line items on an existing checkout.
         *
         * @example
         * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
         * const lineItems = [{variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yOTEwNjAyMjc5Mg==', quantity: 5}];
         *
         * client.checkout.replaceLineItems(checkoutId, lineItems).then((checkout) => {
         *   // Do something with the updated checkout
         * });
         */
        replaceLineItems(checkoutId: string, lineItems: LineItemInput[]): Promise<Cart>;

        /**
         * Replaces the value of checkout's custom attributes and/or note with values defined in the input
         *
         * @example
         * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
         * const input = {customAttributes: [{key: "MyKey", value: "MyValue"}]};
         *
         * client.checkout.updateAttributes(checkoutId, input).then((checkout) => {
         *   // Do something with the updated checkout
         * });
         */
        updateAttributes(
            checkoutId: string,
            input?: {
                allowPartialAddresses?: boolean;
                customAttributes: AttributeInput[];
                note?: string;
            }
        ): Promise<Cart>;

        /**
         * Replaces the value of checkout's email address
         *
         * @example
         * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
         * const email = 'user@example.com';
         *
         * client.checkout.updateEmail(checkoutId, email).then((checkout) => {
         *   // Do something with the updated checkout
         * });
         */
        updateEmail(checkoutId: string, email: string): Promise<Cart>;

        /**
         * Applies a discount to an existing checkout using a discount code.
         *
         * @example
         * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
         * const discountCode = 'best-discount-ever';
         *
         * client.checkout.addDiscount(checkoutId, discountCode).then((checkout) => {
         *   // Do something with the updated checkout
         * });
         */
        addDiscount(checkoutId: string, discountCode: string): Promise<Cart>;

        /**
         * Removes the applied discount from an existing checkout.
         *
         * @example
         * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
         *
         * client.checkout.removeDiscount(checkoutId).then((checkout) => {
         *   // Do something with the updated checkout
         * });
         */
        removeDiscount(checkoutId: string): Promise<Cart>;

        /**
         * Applies gift cards to an existing checkout using a list of gift card codes
         *
         * @example
         * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
         * const giftCardCodes = ['6FD8853DAGAA949F'];
         *
         * client.checkout.addGiftCards(checkoutId, giftCardCodes).then((checkout) => {
         *   // Do something with the updated checkout
         * });
         */
        addGiftCards(checkoutId: string, giftCardCodes: string[]): Promise<Cart>;

        /**
         * Remove a gift card from an existing checkout
         *
         * @example
         * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
         * const appliedGiftCardId = 'Z2lkOi8vc2hvcGlmeS9BcHBsaWVkR2lmdENhcmQvNDI4NTQ1ODAzMTI=';
         *
         * client.checkout.removeGiftCard(checkoutId, appliedGiftCardId).then((checkout) => {
         *   // Do something with the updated checkout
         * });
         */
        removeGiftCard(checkoutId: string, appliedGiftCardId: string): Promise<Cart>;

        /**
         * Updates shipping address on an existing checkout.
         *
         * @example
         * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
         * const shippingAddress = {
         *    address1: 'Chestnut Street 92',
         *    address2: 'Apartment 2',
         *    city: 'Louisville',
         *    company: null,
         *    country: 'United States',
         *    firstName: 'Bob',
         *    lastName: 'Norman',
         *    phone: '555-625-1199',
         *    province: 'Kentucky',
         *    zip: '40202'
         *  };
         *
         * client.checkout.updateShippingAddress(checkoutId, shippingAddress).then(checkout => {
         *   // Do something with the updated checkout
         * });
         */
        updateShippingAddress(checkoutId: string, shippingAddress: MailingAddress): Promise<Cart>;
    }

    // Shop
    export class ShopResource {
        /**
         * Fetches shop information (`currencyCode`, `description`, `moneyFormat`, `name`, and `primaryDomain`).
         * See the {@link https://help.shopify.com/api/storefront-api/reference/object/shop|Storefront API reference} for more information.
         *
         * @example
         * client.shop.fetchInfo().then((shop) => {
         *   // Do something with the shop
         * });
         */
        fetchInfo(): Promise<Shop>;

        /**
         * Fetches shop policies (privacy policy, terms of service and refund policy).
         *
         * @example
         * client.shop.fetchPolicies().then((shop) => {
         *   // Do something with the shop
         * });
         */
        fetchPolicies(): Promise<Shop>;
    }

    // Image
    export class ImageResource {
        helpers: ImageHelpers;
    }

    export interface ImageHelpers {
        /**
         * Generates the image src for a resized image with maximum dimensions `maxWidth` and `maxHeight`.
         * Images do not scale up.
         *
         * @example
         * const url = client.image.helpers.imageForSize(product.variants[0].image, {maxWidth: 50, maxHeight: 50});
         */
        imageForSize(image: Image, options: { maxWidth: number; maxHeight: number }): string;
    }

    //
    // ProductResource return objects and friends
    // ----------------------------------------------------------------------
    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/object/product
     */
    export interface Product extends Node {
        /**
         * Whether the product is available on the Online Store channel and in stock.
         */
        availableForSale: boolean;

        /**
         * The date and time when the product was created.
         */
        createdAt: string;

        /**
         * The date and time when the product was last modified.
         */
        updatedAt: string;

        /**
         * The description of the product, complete with HTML formatting.
         */
        descriptionHtml: string;

        /**
         * Stripped description of the product, single line with HTML tags removed.
         */
        description: string;

        /**
         * A human-friendly unique string for the Product automatically generated from its title.
         * They are used by the Liquid templating language to refer to objects.
         */
        handle: string;

        /**
         * A categorization that a product can be tagged with, commonly used for filtering and searching.
         */
        productType: string;

        /**
         * The product’s title.
         */
        title: string;

        /**
         * The product’s vendor name.
         */
        vendor: string;

        /**
         * The date and time when the product was published to the channel.
         */
        publishedAt: string;

        /**
         * The online store URL for the product. A value of null indicates that the product is not published to the Online Store sales channel.
         */
        onlineStoreUrl: string;

        /**
         * List of custom product options (maximum of 3 per product).
         */
        options: ProductOption[];

        /**
         * List of images associated with the product.
         */
        images: ImageConnection;

        /**
         * List of collections a product belongs to.
         */
        variants: ProductVariantConnection;
    }

    export interface ImageConnection extends BaseConnection<Image> {}

    export interface ProductVariantConnection extends BaseConnection<ProductVariant> {}

    export interface PageInfo {
        /**
         * Indicates if there are more pages to fetch.
         */
        hasNextPage: boolean;

        /**
         * Indicates if there are any pages prior to the current page.
         */
        hasPreviousPage: boolean;
    }

    /**
     * An object specifying the query data
     */
    export interface Query {
        /**
         * The relay `first` param. This specifies page size.
         */
        first?: number;

        /**
         * The key to sort results by. Available values are
         *  documented as {@link https://help.shopify.com/api/storefront-api/reference/enum/productsortkeys|Product Sort Keys}.
         */
        sortKey?: string;

        /**
         * A query string. See full documentation {@link https://help.shopify.com/api/storefront-api/reference/object/shop#products|here}
         */
        query?: string;

        /**
         * Whether or not to reverse the sort order of the results
         */
        reverse?: boolean;
    }

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/object/productvariant
     */
    export interface ProductVariant extends Node {
        /**
         * The product variant’s title.
         */
        title: string;

        /**
         * The product variant’s price.
         */
        price: MoneyV2;

        /**
         * List of prices and compare-at prices in the presentment currencies for this shop.
         */
        presentmentPrices: ProductVariantPricePairConnection;

        /**
         * The weight of the product variant in the unit system specified with weightUnit.
         */
        weight: number;

        /**
         * The SKU (stock keeping unit) associated with the variant.
         */
        sku: string;

        /**
         * Indicates if the product variant is available for sale.
         */
        available: boolean;

        /**
         * The compare at price of the variant.
         * This can be used to mark a variant as on sale, when compareAtPriceV2 is higher than priceV2.
         */
        compareAtPrice: MoneyV2;

        /**
         * Image associated with the product variant. This field falls back to the product image if no image is available.
         */
        image: Image;

        /**
         * List of product options applied to the variant.
         */
        selectedOptions: SelectedOption[];
    }

    export interface ProductVariantPricePairConnection extends BaseConnection<ProductVariantPricePair> {}

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/object/productvariantpricepair
     */
    export interface ProductVariantPricePair {
        compareAtPrice: MoneyV2;
        price: MoneyV2;
    }

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/object/selectedoption
     */
    export interface SelectedOption {
        /**
         * The product option’s name.
         */

        name: string;

        /**
         * The product option’s value.
         */
        value: string;
    }

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/object/productoption
     */
    export interface ProductOption extends Node {
        /**
         * name of option (ex. "Size", "Color")
         */
        name: string;

        /**
         * The corresponding value to the product option name.
         */
        values: Array<string>;
    }

    //
    // CollectionResource return objects and friends
    // ----------------------------------------------------------------------
    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/object/collection
     */
    export interface Collection extends Node {
        /**
         * A human-friendly unique string for the collection automatically generated from its title. Limit of 255 characters.
         */
        handle: string;

        /**
         * Stripped description of the collection, single line with HTML tags removed.
         */
        description: string;

        /**
         * The description of the collection, complete with HTML formatting.
         */
        descriptionHtml: string;

        /**
         * The date and time when the collection was last modified.
         */
        updatedAt: string;

        /**
         * The collection’s name. Limit of 255 characters.
         */
        title: string;

        /**
         * Image associated with the collection.
         */
        image: Image;
    }

    //
    // CheckoutResource return objects and friends
    // ----------------------------------------------------------------------
    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/object/checkout
     */
    export interface Checkout extends Node {
        /**
         * Whether or not the Checkout is ready and can be completed.
         * Checkouts may have asynchronous operations that can take time to finish.
         * If you want to complete a checkout or ensure all the fields are populated
         * and up to date, polling is required until the value is true.
         */

        ready: boolean;

        /**
         * States whether or not the fulfillment requires shipping.
         */
        requiresShipping: boolean;

        note: string | null;

        /**
         * The amount left to be paid. This is equal to the cost of
         * the line items, taxes and shipping minus discounts and gift cards.
         */
        paymentDue: Money;

        /**
         * The amount left to be paid. This is equal to the cost of
         * the line items, taxes and shipping minus discounts and gift cards.
         */
        paymentDueV2: MoneyV2;

        /**
         * The url pointing to the checkout accessible from the web.
         */
        webUrl: string;

        /**
         * The Order Status Page for this Checkout, null when checkout is not completed.
         */
        orderStatusUrl: string | null;

        /**
         * Specifies if the Checkout is tax exempt.
         */
        taxExempt: boolean;

        /**
         * Specifies if taxes are included in the line item and shipping line prices.
         */
        taxesIncluded: boolean;

        /**
         * The currency code for the Checkout.
         */
        currencyCode: CurrencyCode;

        /**
         * The sum of all the taxes applied to the line items and shipping lines in the checkout.
         */
        totalTax: Money;

        /**
         * The sum of all the taxes applied to the line items and shipping lines in the checkout.
         */
        totalTaxV2: MoneyV2;

        /**
         * The sum of all the prices of all the items in the checkout. Taxes, shipping and discounts excluded.
         */
        lineItemsSubtotalPrice: MoneyV2;

        /**
         * The sum of all the prices of all the items in the checkout, taxes and discounts included.
         */
        totalPrice: Money;

        /**
         * The sum of all the prices of all the items in the checkout, taxes and discounts included.
         */
        totalPriceV2: MoneyV2;

        /**
         * The date and time when the checkout was completed.
         */
        completedAt: string | null;

        /**
         * The date and time when the checkout was created.
         */
        createdAt: string;

        /**
         * The date and time when the checkout was last updated.
         */
        updatedAt: string;

        /**
         * The email attached to this checkout.
         */
        email: string | null;

        /**
         * Discounts that have been applied on the checkout.
         */
        discountApplications: DiscountApplicationConnection;

        /**
         * List of applied gift cards on the checkout
         */
        appliedGiftCards: AppliedGiftCard[];

        /**
         * The shipping address to where the line items will be shipped.
         */
        shippingAddress: MailingAddress | null;

        /**
         * Once a shipping rate is selected by the customer it is transitioned to a shippingLine object.
         */
        shippingLine: ShippingRate;

        /**
         * A list of extra information that is added to the checkout.
         */
        customAttributes: Attribute[];

        order: Order | null;

        /**
         * A list of line item objects, each one containing information about an item in the checkout.
         */
        lineItems: CheckoutLineItemConnection;
    }

    export interface DiscountApplicationConnection extends BaseConnection<DiscountApplication> {}

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/interface/discountapplication
     */
    export interface DiscountApplication {
        /**
         * The method by which the discount's value is allocated to its entitled items.
         */
        allocationMethod: DiscountApplicationAllocationMethod;

        /**
         * Which lines of targetType that the discount is allocated over.
         */
        targetSelection: DiscountApplicationTargetSelection;

        /**
         * The type of line that the discount is applicable towards.
         */
        targetType: DiscountApplicationTargetType;

        /**
         * The value of the discount application.
         */
        value: PricingValue;
    }

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/enum/discountapplicationallocationmethod
     */
    export enum DiscountApplicationAllocationMethod {
        /** The value is spread across all entitled lines. */
        ACROSS,
        /** The value is applied onto every entitled line. */
        EACH,
        /** The value is specifically applied onto a particular line. */
        ONE,
    }

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/enum/discountapplicationtargetselection
     */
    export enum DiscountApplicationTargetSelection {
        /** The discount is allocated onto all the lines. */
        ALL,
        /** The discount is allocated onto only the lines it is entitled for. */
        ENTITLED,
        /** The discount is allocated onto explicitly chosen lines. */
        EXPLICIT,
    }

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/enum/discountapplicationtargettype
     */
    export enum DiscountApplicationTargetType {
        /** The discount applies onto line items. */
        LINE_ITEM,
        /** The discount applies onto shipping lines. */
        SHIPPING_LINE,
    }

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/object/appliedgiftcard
     */
    interface AppliedGiftCard extends Node {
        /**
         * The amount that was taken from the Gift Card by applying it.
         */
        amountUsedV2: MoneyV2;

        /**
         * The amount left on the Gift Card.
         */
        balanceV2: MoneyV2;

        /**
         * The amount that was applied to the checkout in its currency.
         */
        presentmentAmountUsed: MoneyV2;

        /**
         * The last characters of the Gift Card code
         */
        lastCharacters: string;
    }

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/object/shippingrate
     */
    interface ShippingRate {
        /**
         * Human-readable unique identifier for this shipping rate.
         */
        handle: string;

        /**
         * Price of this shipping rate.
         */
        price: Money;

        /**
         * Title of this shipping rate.
         */
        title: string;
    }

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/object/order
     */
    interface Order extends Node {
        /**
         * The date and time when the order was imported. This value can be set to dates
         * in the past when importing from other systems. If no value is provided, it
         * will be auto-generated based on current date and time.
         */
        processedAt: string;

        /**
         * A unique numeric identifier for the order for use by shop owner and customer.
         */
        orderNumber: number;

        /**
         * Price of the order before shipping and taxes.
         */
        subtotalPrice: Money;

        /**
         * Price of the order before shipping and taxes.
         */
        subtotalPriceV2: MoneyV2;

        /**
         * The total cost of shipping.
         */
        totalShippingPrice: Money;

        /**
         * The total cost of shipping.
         */
        totalShippingPriceV2: MoneyV2;

        /**
         * The total cost of taxes.
         */
        totalTax: Money;

        /**
         * The total cost of taxes.
         */
        totalTaxV2: MoneyV2;

        /**
         * The sum of all the prices of all the items in the order, taxes and discounts
         * included (must be positive).
         */
        totalPrice: Money;

        /**
         * The sum of all the prices of all the items in the order, taxes and discounts
         * included (must be positive).
         */
        totalPriceV2: MoneyV2;

        /**
         * The code of the currency used for the payment.
         */
        currencyCode: CurrencyCode;

        /**
         * The total amount that has been refunded.
         */
        totalRefunded: Money;

        /**
         * The total amount that has been refunded.
         */
        totalRefundedV2: MoneyV2;

        /**
         * The unique URL that the customer can use to access the order.
         */
        customerUrl: string | null;

        /**
         * The address to where the order will be shipped.
         */
        shippingAddress: MailingAddress | null;

        /**
         * List of the order’s line items.
         */
        lineItems: OrderLineItemConnection;
    }

    interface OrderLineItemConnection extends BaseConnection<OrderLineItem> {}

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/object/orderlineitem
     */
    interface OrderLineItem {
        /**
         * Extra information in the form of an array of Key-Value pairs about the line item.
         */
        customAttributes: Attribute[];

        /**
         * The discounts that have been allocated onto the checkout line item by discount applications.
         */
        discountAllocations: DiscountAllocation[];

        /**
         * The quantity of the line item.
         */
        quantity: number;

        /**
         * Title of the line item. Defaults to the product's title.
         */
        title: string;

        /**
         * Product variant of the line item.
         */
        variant: ProductVariant | null;
    }

    interface CheckoutLineItemConnection extends BaseConnection<CheckoutLineItem> {}

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/object/checkoutlineitem
     */
    interface CheckoutLineItem extends Node {
        /**
         * Extra information in the form of an array of Key-Value pairs about the line item.
         */
        customAttributes: Attribute[];

        /**
         * The discounts that have been allocated onto the checkout line item by discount applications.
         */
        discountAllocations: DiscountAllocation[];

        /**
         * The quantity of the line item.
         */
        quantity: number;

        /**
         * Title of the line item. Defaults to the product's title.
         */
        title: string;

        /**
         * Product variant of the line item.
         */
        variant: ProductVariant | null;
    }

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!

    export interface Cart {
        /**
         * Get checkout URL for current cart
         */
        checkoutUrl: string;

        /**
         * get ID for current cart
         */
        id: string;

        /**
         * Gets the total quantity of all line items. Example: you've added two variants
         * with quantities 3 and 2. lineItemCount will be 5.
         */
        lineItemCount: number;

        /**
         * Get an Array of CartLineItemModel's
         */
        lineItems: CheckoutLineItem[];

        /**
         * Get current subtotal price for all line items, before shipping, taxes, and discounts.
         * Example: two items have been added to the cart that cost $1.25 then the subtotal will be 2.50
         */
        subtotalPrice: string;

        appliedGiftCards: any;
        availableShippingRates: any;
        completedAt: string;
        createdAt: string;
        currencyCode: string;
        customAttributes: Attribute[];
        email?: string;
        lineItemsSubtotalPrice: MoneyV2[];
        note?: string;
        order?: any;
        orderStatusUrl?: string;
        paymentDueV2: MoneyV2;
        ready: boolean;
        requiresShipping: boolean;
        shippingAddress?: MailingAddress;
        shippingDiscountAllocations: any;
        shippingLine?: any;
        subtotalPriceV2: MoneyV2;
        taxExempt: boolean;
        taxesIncluded: boolean;
        totalPriceV2: MoneyV2;
        totalTaxV2: MoneyV2;
        updatedAt: string;
        webUrl: string;
    }

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/input-object/checkoutlineiteminput
     */
    export interface LineItemInput {
        /**
         * Extra information in the form of an array of Key-Value pairs about the line item.
         */
        customAttributes?: AttributeInput[];

        /**
         * The quantity of the line item.
         */
        quantity: number;

        /**
         * The identifier of the product variant for the line item.
         */
        variantId: string;
    }

    /**
     * https://help.shopify.com/en/api/storefront-api/reference/object/discountallocation
     */
    export interface DiscountAllocation {
        allocatedAmount: MoneyV2;
        discountApplication: DiscountApplication;
    }

    /**
     * https://help.shopify.com/en/api/storefront-api/reference/interface/discountapplication
     */
    export interface DiscountApplication {
        allocationMethod: any;
        targetSelection: any;
        targetType: any;
        value: any;
    }

    /**
     * https://help.shopify.com/en/api/storefront-api/reference/union/pricingvalue
     */
    export type PricingValue = MoneyV2 | PricingPercentageValue;

    /**
     * https://help.shopify.com/en/api/storefront-api/reference/object/pricingpercentagevalue
     */
    export interface PricingPercentageValue {
        percentage: string;
    }

    /**
     * @see https://help.shopify.com/en/api/graphql-admin-api/reference/scalar/money
     */
    export type Money = string;

    /**
     * https://help.shopify.com/en/api/storefront-api/reference/object/moneyv2
     */
    export interface MoneyV2 {
        amount: number;
        // @todo: type https://help.shopify.com/en/api/storefront-api/reference/enum/currencycode
        currencyCode: string;
    }

    export interface Item {
        variant: ProductVariant;
        quantity: number;
    }

    /**
     * https://help.shopify.com/en/api/storefront-api/reference/object/mailingaddress
     */
    export interface MailingAddress extends Node {
        /**
         * The first line of the address. Typically the street address or PO Box number.
         */
        address1?: string;

        /**
         * The second line of the address. Typically the number of the apartment, suite, or unit.
         */
        address2?: string;

        /**
         * The name of the city, district, village, or town.
         */
        city?: string;

        /**
         * The name of the customer's company or organization.
         */
        company?: string;

        /**
         * The name of the country.
         */
        country?: string;

        /**
         * The first name of the customer.
         */
        firstName?: string;

        /**
         * A formatted version of the address including the customer's company and name
         */
        formatted?: string;

        /**
         * The last name of the customer.
         */
        lastName?: string;

        /**
         * The latitude coordinate of the customer address.
         */
        latitude?: string;

        /**
         * The longitude coordinate of the customer address.
         */
        longitude?: string;

        /**
         * A unique phone number for the customer.
         * Formatted using E.164 standard. For example, +16135551111.
         */
        phone?: string;

        /**
         * The region of the address, such as the province, state, or district.
         */
        province?: string;

        /**
         * The zip or postal code of the address.
         */
        zip?: string;

        /**
         * The full name of the customer, based on firstName and lastName.
         */
        name?: string;

        /**
         * The two-letter code for the country of the address.
         * For example, US.
         */
        countryCode?: CountryCodeV2;

        /**
         * The two-letter code for the region.
         * For example, ON.
         */
        provinceCode: string;
    }

    /**
     * https://help.shopify.com/en/api/storefront-api/reference/enum/countrycode
     */
    export type CountryCodeV2 = string; //@todo

    /**
     * https://help.shopify.com/en/api/storefront-api/reference/object/attribute
     */
    export interface Attribute {
        key: string;
        value: string | null;
    }

    /**
     * @see https://help.shopify.com/api/storefront-api/reference/input-object/attributeinput
     */
    export interface AttributeInput {
        key: string;
        value: string;
    }

    /**
     * TODO Validate schema matches js-buy
     * Derived from REST API Docs: https://help.shopify.com/api/custom-storefronts/storefront-api/reference/object/shop#fields
     */
    export interface Shop {
        description: string;
        moneyFormat: string;
        name: string;
        /**
         * TODO Add types for the Shop properties below
         * PaymentSettings, ShopPolicy etc
         */
        paymentSettings: any;
        primaryDomain: any;
        privacyPolicy: any;
        refundPolicy: any;
        termsOfService: any;
    }

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/object/image
     */
    export interface Image {
        altText: string;
        id: string;
        originalSrc: string;
        transformedSrc: string;
    }

    //
    // Generic/Global interfaces and types
    // ----------------------------------------------------------------------
    /**
     * this is a generic connection interface that's used by others like ImageConnection
     */
    export interface BaseConnection<N> {
        edges: Array<{
            cursor: string;
            node: N;
        }>;
        pageInfo: PageInfo;
    }

    export interface Node {
        /**
         * Globally unique identifier.
         */
        id: string;
    }
}

declare module 'shopify-buy' {
    export = ShopifyBuy;
}
