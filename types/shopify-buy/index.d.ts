// Type definitions for shopify-buy 2.6
// Project: http://shopify.github.io/js-buy-sdk/api/
// Definitions by: Martin Köhn <https://github.com/openminder>
//                 Stephen Traiforos <https://github.com/straiforos>
//                 Rosana Ruiz <https://github.com/totemika>
//                 Pierre Ortega <https://github.com/PierreAndreis>
//                 Rogelio Negrete <https://github.com/weffe>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.7
// Types verified against Shopify API Reference version: 2019-07

// Important Note:
// The true shape of certain resources/responses can be found in the
// js-buy-sdk graphql's query files. Just because the online API reference has
// certain properties does NOT mean that they are queried in the graphql request
// that the js-buy-sdk client issues. So don't be confused or alarmed if certain
// properties are missing according to the online API docs as they are just not
// queried in the actual client graphql query.

/**
 * The JS Buy SDK is a lightweight library that allows you to build ecommerce into any website.
 * It is based on Shopify’s API and provides the ability to retrieve products and collections from your shop,
 * add products to a cart, and checkout.
 * It can render data on the client side or server. This will allow you to add ecommerce functionality to any
 * website or javascript application. This is helpful if you already have a website and need to add ecommerce
 * or only need a simple buy button on your site.
 */
declare namespace ShopifyBuy {
    //#region Top Level API
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
    //#endregion Top Level API

    //#region ProductResource and friends
    // ----------------------------------------------------------------------
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
        fetchQuery(query: ProductQuery): Promise<Product[]>;

        helpers: ProductHelpers;
    }

    export interface ProductQuery extends BaseQuery {
        /**
         * The key to sort results by. Available values are
         * documented as {@link https://help.shopify.com/api/storefront-api/reference/enum/productsortkeys|Product Sort Keys}.
         */
        sortKey?: ProductSortKeys;
    }

    export enum ProductSortKeys {
        /**
         * Sort by the vendor value.
         */
        VENDOR = 'VENDOR',

        /**
         * Sort by the created_at value.
         */
        CREATED_AT = 'CREATED_AT',

        /**
         * Sort by the id value.
         */
        ID = 'ID',

        /**
         * Sort by the price value.
         */
        PRICE = 'PRICE',

        /**
         * Sort by the product_type value.
         */
        PRODUCT_TYPE = 'PRODUCT_TYPE',

        /**
         * During a search (i.e. when the query parameter has been specified on the connection)
         * this sorts the results by relevance to the search term(s). When no search query
         * is specified, this sort key is not deterministic and should not be used.
         */
        RELEVANCE = 'RELEVANCE',

        /**
         * Sort by the title value.
         */
        TITLE = 'TITLE',

        /**
         * Sort by the updated_at value.
         */
        UPDATED_AT = 'UPDATED_AT',

        /**
         * Sort by the best_selling value.
         */
        BEST_SELLING = 'BEST_SELLING',
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
        onlineStoreUrl: URL | null;

        /**
         * List of custom product options (maximum of 3 per product).
         */
        options: ProductOption[];

        /**
         * List of images associated with the product.
         */
        images: Pick<Image, 'id' | 'src' | 'altText'>;

        /**
         * List of collections a product belongs to.
         */
        variants: ProductVariant;
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
        price: Money; // needs update to v2

        /**
         * List of prices and compare-at prices in the presentment currencies for this shop.
         */
        presentmentPrices: ProductVariantPricePair;

        /**
         * The weight of the product variant in the unit system specified with weightUnit.
         */
        weight: number | null;

        /**
         * The SKU (stock keeping unit) associated with the variant.
         */
        sku: string | null;

        /**
         * Indicates if the product variant is available for sale.
         */
        available: boolean;

        /**
         * The compare at price of the variant.
         * This can be used to mark a variant as on sale, when compareAtPriceV2 is higher than priceV2.
         */
        compareAtPrice: Money; // needs update to v2

        /**
         * Image associated with the product variant. This field falls back to the product image if no image is available.
         */
        image: Pick<Image, 'id' | 'src' | 'altText'> | null;

        /**
         * List of product options applied to the variant.
         */
        selectedOptions: SelectedOption[];
    }

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/object/productvariantpricepair
     */
    export interface ProductVariantPricePair {
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
    //#endregion ProductResource and friends

    //#region CollectionResource and friends
    // ----------------------------------------------------------------------
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
        fetch(id: string): Promise<Collection>;

        /**
         * Fetches a single collection by ID on the shop, including products.
         *
         * @example
         * client.collection.fetchWithProducts('Xk9lM2JkNzFmNzIQ4NTIY4ZDFiZTUyZTUwNTE2MDNhZjg==').then((collection) => {
         *   // Do something with the collection
         * });
         */
        fetchWithProducts(id: string): Promise<CollectionWithProducts>;

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
        fetchAllWithProducts(): Promise<CollectionWithProducts[]>;

        /**
         * Fetches a collection by handle on the shop.
         *
         * @example
         * client.collection.fetchByHandle('my-collection').then((collection) => {
         *   // Do something with the collection
         * });
         */
        fetchByHandle(handle: string): Promise<CollectionWithProducts>;

        /**
         * Fetches all collections on the shop that match the query.
         *
         * @example
         * client.collection.fetchQuery({first: 20, sortKey: 'CREATED_AT', reverse: true}).then((collections) => {
         *   // Do something with the first 10 collections sorted by title in ascending order
         * });
         */
        fetchQuery(query: CollectionQuery): Promise<Collection[]>;
    }

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
        image: Pick<Image, 'id' | 'src' | 'altText'> | null;
    }

    export interface CollectionWithProducts extends Collection {
        products: Product[];
    }

    export interface CollectionQuery extends BaseQuery {
        /**
         * The key to sort results by. Available values are
         * documented as {@link https://help.shopify.com/api/storefront-api/reference/enum/collectionsortkeys|Collection Sort Keys}.
         */
        sortKey?: CollectionSortKeys;
    }

    export enum CollectionSortKeys {
        /**
         * Sort by the id value.
         */
        ID = 'ID',

        /**
         * During a search (i.e. when the query parameter has been specified
         * on the connection) this sorts the results by relevance to the search term(s).
         * When no search query is specified, this sort key is not deterministic and
         * should not be used.
         */
        RELEVANCE = 'RELEVANCE',

        /**
         * Sort by the title value.
         */
        TITLE = 'TITLE',

        /**
         * Sort by the updated_at value.
         */
        UPDATED_AT = 'UPDATED_AT',
    }

    //#endregion CollectionResource and friends

    //#region CheckoutResource and friends
    // ----------------------------------------------------------------------
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
            lineItems?: CheckoutLineItemInput[];
            shippingAddress?: MailingAddress;
            note?: string;
            customAttributes?: AttributeInput[];
        }): Promise<Checkout>;

        /**
         * Fetches a checkout by ID.
         *
         * @example
         * client.checkout.fetch('FlZj9rZXlN5MDY4ZDFiZTUyZTUwNTE2MDNhZjg=').then((checkout) => {
         *   // Do something with the checkout
         * });
         */
        fetch(id: string): Promise<Checkout>;

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
        addLineItems(checkoutId: string, lineItems: CheckoutLineItemInput[]): Promise<Checkout>;

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
        removeLineItems(checkoutId: string, lineItemIds: string[]): Promise<Checkout>;

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
        updateLineItems(checkoutId: string, lineItems: CheckoutLineItemInput[]): Promise<Checkout>;

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
        replaceLineItems(checkoutId: string, lineItems: CheckoutLineItemInput[]): Promise<Checkout>;

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
                customAttributes?: AttributeInput[];
                note?: string;
            }
        ): Promise<Checkout>;

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
        updateEmail(checkoutId: string, email: string): Promise<Checkout>;

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
        addDiscount(checkoutId: string, discountCode: string): Promise<Checkout>;

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
        removeDiscount(checkoutId: string): Promise<Checkout>;

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
        addGiftCards(checkoutId: string, giftCardCodes: string[]): Promise<Checkout>;

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
        removeGiftCard(checkoutId: string, appliedGiftCardId: string): Promise<Checkout>;

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
        updateShippingAddress(checkoutId: string, shippingAddress: MailingAddress): Promise<Checkout>;
    }

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
        webUrl: URL;

        /**
         * The Order Status Page for this Checkout, null when checkout is not completed.
         */
        orderStatusUrl: URL | null;

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
        discountApplications: DiscountApplication;

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
        shippingLine: ShippingRate | null;

        /**
         * A list of extra information that is added to the checkout.
         */
        customAttributes: Attribute[];

        order: Order | null;

        /**
         * A list of line item objects, each one containing information about an item in the checkout.
         */
        lineItems: CheckoutLineItem;
    }

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

        // since a "DiscountApplication" can be a subset of ManualDiscountApplication
        // or DiscountCodeApplication or ScriptDiscountApplication
        // or AutomaticDiscountApplication then we must specify the props as optional.
        // A discriminated union wouldn't work here as we cannot guarantee at compile
        // time that the graphql query will only get a "AutomaticDiscountApplication"
        // or a "ScriptDiscountApplication", etc. So optional props are the best option.

        /**
         * The title of the application.
         */
        title?: string;

        /**
         * The description of the application.
         */
        description?: string | null;

        /**
         * The string identifying the discount code that was used at the time of application.
         */
        code?: string;

        /**
         * Specifies whether the discount code was applied successfully.
         */
        applicable?: boolean;
    }

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/enum/discountapplicationallocationmethod
     */
    export enum DiscountApplicationAllocationMethod {
        /** The value is spread across all entitled lines. */
        ACROSS = 'ACROSS',
        /** The value is applied onto every entitled line. */
        EACH = 'EACH',
        /** The value is specifically applied onto a particular line. */
        ONE = 'ONE',
    }

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/enum/discountapplicationtargetselection
     */
    export enum DiscountApplicationTargetSelection {
        /** The discount is allocated onto all the lines. */
        ALL = 'ALL',
        /** The discount is allocated onto only the lines it is entitled for. */
        ENTITLED = 'ENTITLED',
        /** The discount is allocated onto explicitly chosen lines. */
        EXPLICIT = 'EXPLICIT',
    }

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/enum/discountapplicationtargettype
     */
    export enum DiscountApplicationTargetType {
        /** The discount applies onto line items. */
        LINE_ITEM = 'LINE_ITEM',
        /** The discount applies onto shipping lines. */
        SHIPPING_LINE = 'SHIPPING_LINE',
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
     * @see https://help.shopify.com/en/api/storefront-api/reference/object/mailingaddress
     */
    export interface MailingAddress extends Node {
        /**
         * The first line of the address. Typically the street address or PO Box number.
         */
        address1: string | null;

        /**
         * The second line of the address. Typically the number of the apartment, suite, or unit.
         */
        address2: string | null;

        /**
         * The name of the city, district, village, or town.
         */
        city: string | null;

        /**
         * The name of the customer's company or organization.
         */
        company: string | null;

        /**
         * The name of the country.
         */
        country: string | null;

        /**
         * A formatted version of the address including the customer's company and name
         */
        formatted: string[];

        /**
         * The first name of the customer.
         */
        firstName: string | null;

        /**
         * The last name of the customer.
         */
        lastName: string | null;

        /**
         * The latitude coordinate of the customer address.
         */
        latitude: number | null;

        /**
         * The longitude coordinate of the customer address.
         */
        longitude: number | null;

        /**
         * A unique phone number for the customer.
         * Formatted using E.164 standard. For example, +16135551111.
         */
        phone: string | null;

        /**
         * The region of the address, such as the province, state, or district.
         */
        province: string | null;

        /**
         * The zip or postal code of the address.
         */
        zip: string | null;

        /**
         * The full name of the customer, based on firstName and lastName.
         */
        name: string | null;

        /**
         * The two-letter code for the country of the address.
         * For example, US.
         */
        countryCode: CountryCode | null;

        /**
         * The two-letter code for the region.
         * For example, ON.
         */
        provinceCode: string | null;
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
        customerUrl: URL | null;

        /**
         * The address to where the order will be shipped.
         */
        shippingAddress: MailingAddress | null;

        /**
         * List of the order’s line items.
         */
        lineItems: OrderLineItem;
    }

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

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/object/attribute
     */
    export interface Attribute {
        key: string;
        value: string | null;
    }

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/object/discountallocation
     */
    export interface DiscountAllocation {
        allocatedAmount: MoneyV2;
        discountApplication: DiscountApplication;
    }

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

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/input-object/checkoutlineiteminput
     */
    export interface CheckoutLineItemInput {
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
    //#endregion CheckoutResource and friends

    //#region ShopResource and friends
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
        fetchPolicies(): Promise<Policies>;
    }

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/object/shop
     */
    export interface Shop {
        /**
         * The three-letter code for the currency that the shop accepts.
         */
        currencyCode: CurrencyCode;

        /**
         * Settings related to payments.
         */
        paymentSettings: {
            /**
             * A list of enabled currencies (ISO 4217 format) that the shop accepts.
             * Merchants can enable currencies from their Shopify Payments
             * settings in the Shopify admin.
             */
            enabledPresentmentCurrencies: CurrencyCode[];
        };

        /**
         * A description of the shop.
         */
        description: string | null;

        /**
         * A string representing the way currency is formatted when
         * the currency isn’t specified.
         */
        moneyFormat: string;

        /**
         * The shop’s name.
         */
        name: string;

        primaryDomain: Domain;
    }

    export interface Domain {
        /**
         * The host name of the domain (eg: example.com).
         */
        host: string;

        /**
         * Whether SSL is enabled or not.
         */
        sslEnabled: boolean;

        /**
         * The URL of the domain (eg: https://example.com).
         */
        url: URL;
    }

    export interface Policies {
        privacyPolicy: ShopPolicy;
        termsOfService: ShopPolicy;
        refundPolicy: ShopPolicy;
    }

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/object/shoppolicy
     */
    interface ShopPolicy extends Node {
        /**
         * Policy’s title.
         */
        title: string;

        /**
         * Public URL to the policy.
         */
        url: URL;

        /**
         * Policy text, maximum size of 64kb.
         */
        body: string;
    }
    //#endregion ShopResource and friends

    //#region ImageResource and friends
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
        // image arg only needs a `src` prop present in the object
        imageForSize(image: Pick<Image, 'src'>, options: { maxWidth: number; maxHeight: number }): string;
    }
    //#endregion ImageResource and friends

    //#region Shared Types
    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/scalar/url
     */
    export type URL = string;

    /**
     * @see https://help.shopify.com/en/api/graphql-admin-api/reference/scalar/money
     */
    export type Money = string;

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/object/moneyv2
     */
    export interface MoneyV2 {
        amount: number;
        currencyCode: CurrencyCode;
    }

    /**
     * @see https://help.shopify.com/api/storefront-api/reference/input-object/attributeinput
     */
    export interface AttributeInput {
        key: string;
        value: string;
    }

    /**
     * @see https://help.shopify.com/en/api/storefront-api/reference/object/image
     */
    export interface Image {
        /**
         * A unique identifier for the image.
         */
        id: string | null;

        /**
         * A word or phrase to share the nature or contents of an image.
         */
        altText: string | null;

        /**
         * The location of the image as a URL.
         */
        src: string;

        /**
         * The location of the original image as a URL.
         * If there are any existing transformations in the
         * original source URL, they will remain and not be stripped.
         */
        originalSrc: string;

        /**
         * The location of the transformed image as a URL. All transformation arguments are
         * considered "best-effort". If they can be applied to an image, they will be.
         * Otherwise any transformations which an image type does not support will be ignored.
         */
        transformedSrc: string;
    }

    /**
     * An object specifying the query data
     */
    interface BaseQuery {
        /**
         * The relay `first` param. This specifies page size.
         */
        first?: number;

        /**
         * A query string.
         */
        query?: string;

        /**
         * Whether or not to reverse the sort order of the results
         */
        reverse?: boolean;
    }

    interface Node {
        /**
         * Globally unique identifier.
         */
        id: string;
    }

    export enum CurrencyCode {
        /** Zambian Kwacha (ZMW) */
        ZMW = 'ZMW',
        /** Afghan Afghani (AFN) */
        AFN = 'AFN',
        /** Albanian Lek (ALL) */
        ALL = 'ALL',
        /** Armenian Dram (AMD) */
        AMD = 'AMD',
        /** Netherlands Antillean Guilder */
        ANG = 'ANG',
        /** Angolan Kwanza (AOA) */
        AOA = 'AOA',
        /** Argentine Pesos (ARS) */
        ARS = 'ARS',
        /** Australian Dollars (AUD) */
        AUD = 'AUD',
        /** Aruban Florin (AWG) */
        AWG = 'AWG',
        /** Azerbaijani Manat (AZN) */
        AZN = 'AZN',
        /** Bosnia and Herzegovina Convertible Mark (BAM) */
        BAM = 'BAM',
        /** Barbadian Dollar (BBD) */
        BBD = 'BBD',
        /** Bangladesh Taka (BDT) */
        BDT = 'BDT',
        /** Bulgarian Lev (BGN) */
        BGN = 'BGN',
        /** Bahraini Dinar (BHD) */
        BHD = 'BHD',
        /** Burundian Franc (BIF) */
        BIF = 'BIF',
        /** Bermudian Dollar (BMD) */
        BMD = 'BMD',
        /** Brunei Dollar (BND) */
        BND = 'BND',
        /** Bolivian Boliviano (BOB) */
        BOB = 'BOB',
        /** Brazilian Real (BRL) */
        BRL = 'BRL',
        /** Bahamian Dollar (BSD) */
        BSD = 'BSD',
        /** Bhutanese Ngultrum (BTN) */
        BTN = 'BTN',
        /** Botswana Pula (BWP) */
        BWP = 'BWP',
        /** United Arab Emirates Dirham (AED) */
        AED = 'AED',
        /** Belize Dollar (BZD) */
        BZD = 'BZD',
        /** Canadian Dollars (CAD) */
        CAD = 'CAD',
        /** Congolese franc (CDF) */
        CDF = 'CDF',
        /** Swiss Francs (CHF) */
        CHF = 'CHF',
        /** Chilean Peso (CLP) */
        CLP = 'CLP',
        /** Chinese Yuan Renminbi (CNY) */
        CNY = 'CNY',
        /** Colombian Peso (COP) */
        COP = 'COP',
        /** Costa Rican Colones (CRC) */
        CRC = 'CRC',
        /** Cape Verdean escudo (CVE) */
        CVE = 'CVE',
        /** Czech Koruny (CZK) */
        CZK = 'CZK',
        /** Danish Kroner (DKK) */
        DKK = 'DKK',
        /** Dominican Peso (DOP) */
        DOP = 'DOP',
        /** Algerian Dinar (DZD) */
        DZD = 'DZD',
        /** Egyptian Pound (EGP) */
        EGP = 'EGP',
        /** Ethiopian Birr (ETB) */
        ETB = 'ETB',
        /** Euro (EUR) */
        EUR = 'EUR',
        /** Fijian Dollars (FJD) */
        FJD = 'FJD',
        /** United Kingdom Pounds (GBP) */
        GBP = 'GBP',
        /** Georgian Lari (GEL) */
        GEL = 'GEL',
        /** Ghanaian Cedi (GHS) */
        GHS = 'GHS',
        /** Gambian Dalasi (GMD) */
        GMD = 'GMD',
        /** Guatemalan Quetzal (GTQ) */
        GTQ = 'GTQ',
        /** Guyanese Dollar (GYD) */
        GYD = 'GYD',
        /** Hong Kong Dollars (HKD) */
        HKD = 'HKD',
        /** Honduran Lempira (HNL) */
        HNL = 'HNL',
        /** Croatian Kuna (HRK) */
        HRK = 'HRK',
        /** Haitian Gourde (HTG) */
        HTG = 'HTG',
        /** Hungarian Forint (HUF) */
        HUF = 'HUF',
        /** Indonesian Rupiah (IDR) */
        IDR = 'IDR',
        /** Israeli New Shekel (NIS) */
        ILS = 'ILS',
        /** Indian Rupees (INR) */
        INR = 'INR',
        /** Iraqi Dinar (IQD) */
        IQD = 'IQD',
        /** Icelandic Kronur (ISK) */
        ISK = 'ISK',
        /** Jersey Pound */
        JEP = 'JEP',
        /** Jamaican Dollars (JMD) */
        JMD = 'JMD',
        /** Jordanian Dinar (JOD) */
        JOD = 'JOD',
        /** Japanese Yen (JPY) */
        JPY = 'JPY',
        /** Kenyan Shilling (KES) */
        KES = 'KES',
        /** Kyrgyzstani Som (KGS) */
        KGS = 'KGS',
        /** Cambodian Riel */
        KHR = 'KHR',
        /** Comorian Franc (KMF) */
        KMF = 'KMF',
        /** South Korean Won (KRW) */
        KRW = 'KRW',
        /** Kuwaiti Dinar (KWD) */
        KWD = 'KWD',
        /** Cayman Dollars (KYD) */
        KYD = 'KYD',
        /** Kazakhstani Tenge (KZT) */
        KZT = 'KZT',
        /** Laotian Kip (LAK) */
        LAK = 'LAK',
        /** Lebanese Pounds (LBP) */
        LBP = 'LBP',
        /** Sri Lankan Rupees (LKR) */
        LKR = 'LKR',
        /** Liberian Dollar (LRD) */
        LRD = 'LRD',
        /** Lesotho Loti (LSL) */
        LSL = 'LSL',
        /** Lithuanian Litai (LTL) */
        LTL = 'LTL',
        /** Latvian Lati (LVL) */
        LVL = 'LVL',
        /** Moroccan Dirham */
        MAD = 'MAD',
        /** Moldovan Leu (MDL) */
        MDL = 'MDL',
        /** Malagasy Ariary (MGA) */
        MGA = 'MGA',
        /** Macedonia Denar (MKD) */
        MKD = 'MKD',
        /** Burmese Kyat (MMK) */
        MMK = 'MMK',
        /** Mongolian Tugrik */
        MNT = 'MNT',
        /** Macanese Pataca (MOP) */
        MOP = 'MOP',
        /** Mauritian Rupee (MUR) */
        MUR = 'MUR',
        /** Maldivian Rufiyaa (MVR) */
        MVR = 'MVR',
        /** Malawian Kwacha (MWK) */
        MWK = 'MWK',
        /** Mexican Pesos (MXN) */
        MXN = 'MXN',
        /** Malaysian Ringgits (MYR) */
        MYR = 'MYR',
        /** Mozambican Metical */
        MZN = 'MZN',
        /** Namibian Dollar */
        NAD = 'NAD',
        /** Nigerian Naira (NGN) */
        NGN = 'NGN',
        /** Nicaraguan Córdoba (NIO) */
        NIO = 'NIO',
        /** Norwegian Kroner (NOK) */
        NOK = 'NOK',
        /** Nepalese Rupee (NPR) */
        NPR = 'NPR',
        /** New Zealand Dollars (NZD) */
        NZD = 'NZD',
        /** Omani Rial (OMR) */
        OMR = 'OMR',
        /** Panamian Balboa (PAB) */
        PAB = 'PAB',
        /** Peruvian Nuevo Sol (PEN) */
        PEN = 'PEN',
        /** Papua New Guinean Kina (PGK) */
        PGK = 'PGK',
        /** Philippine Peso (PHP) */
        PHP = 'PHP',
        /** Pakistani Rupee (PKR) */
        PKR = 'PKR',
        /** Polish Zlotych (PLN) */
        PLN = 'PLN',
        /** Paraguayan Guarani (PYG) */
        PYG = 'PYG',
        /** Qatari Rial (QAR) */
        QAR = 'QAR',
        /** Romanian Lei (RON) */
        RON = 'RON',
        /** Serbian dinar (RSD) */
        RSD = 'RSD',
        /** Russian Rubles (RUB) */
        RUB = 'RUB',
        /** Rwandan Franc (RWF) */
        RWF = 'RWF',
        /** Saudi Riyal (SAR) */
        SAR = 'SAR',
        /** Solomon Islands Dollar (SBD) */
        SBD = 'SBD',
        /** Seychellois Rupee (SCR) */
        SCR = 'SCR',
        /** Sudanese Pound (SDG) */
        SDG = 'SDG',
        /** Swedish Kronor (SEK) */
        SEK = 'SEK',
        /** Singapore Dollars (SGD) */
        SGD = 'SGD',
        /** Surinamese Dollar (SRD) */
        SRD = 'SRD',
        /** South Sudanese Pound (SSP) */
        SSP = 'SSP',
        /** Sao Tome And Principe Dobra (STD) */
        STD = 'STD',
        /** Syrian Pound (SYP) */
        SYP = 'SYP',
        /** Swazi Lilangeni (SZL) */
        SZL = 'SZL',
        /** Thai baht (THB) */
        THB = 'THB',
        /** Turkmenistani Manat (TMT) */
        TMT = 'TMT',
        /** Tunisian Dinar (TND) */
        TND = 'TND',
        /** Turkish Lira (TRY) */
        TRY = 'TRY',
        /** Trinidad and Tobago Dollars (TTD) */
        TTD = 'TTD',
        /** Taiwan Dollars (TWD) */
        TWD = 'TWD',
        /** Tanzanian Shilling (TZS) */
        TZS = 'TZS',
        /** Ukrainian Hryvnia (UAH) */
        UAH = 'UAH',
        /** Ugandan Shilling (UGX) */
        UGX = 'UGX',
        /** United States Dollars (USD) */
        USD = 'USD',
        /** Uruguayan Pesos (UYU) */
        UYU = 'UYU',
        /** Uzbekistan som (UZS) */
        UZS = 'UZS',
        /** Venezuelan Bolivares (VEF) */
        VEF = 'VEF',
        /** Vietnamese đồng (VND) */
        VND = 'VND',
        /** Vanuatu Vatu (VUV) */
        VUV = 'VUV',
        /** Samoan Tala (WST) */
        WST = 'WST',
        /** Central African CFA Franc (XAF) */
        XAF = 'XAF',
        /** East Caribbean Dollar (XCD) */
        XCD = 'XCD',
        /** West African CFA franc (XOF) */
        XOF = 'XOF',
        /** CFP Franc (XPF) */
        XPF = 'XPF',
        /** Yemeni Rial (YER) */
        YER = 'YER',
        /** South African Rand (ZAR) */
        ZAR = 'ZAR',
        /**
         * Belarusian Ruble (BYR)
         * @deprecated BYR is deprecated. Use BYN available from version 2019-10 onwards instead.
         */
        BYR = 'BYR',
    }

    export enum CountryCode {
        /** Zimbabwe. */
        ZW = 'ZW',
        /** United Arab Emirates. */
        AE = 'AE',
        /** Afghanistan. */
        AF = 'AF',
        /** Antigua And Barbuda. */
        AG = 'AG',
        /** Anguilla. */
        AI = 'AI',
        /** Albania. */
        AL = 'AL',
        /** Armenia. */
        AM = 'AM',
        /** Netherlands Antilles. */
        AN = 'AN',
        /** Angola. */
        AO = 'AO',
        /** Argentina. */
        AR = 'AR',
        /** Austria. */
        AT = 'AT',
        /** Australia. */
        AU = 'AU',
        /** Aruba. */
        AW = 'AW',
        /** Aland Islands. */
        AX = 'AX',
        /** Azerbaijan. */
        AZ = 'AZ',
        /** Bosnia And Herzegovina. */
        BA = 'BA',
        /** Barbados. */
        BB = 'BB',
        /** Bangladesh. */
        BD = 'BD',
        /** Belgium. */
        BE = 'BE',
        /** Burkina Faso. */
        BF = 'BF',
        /** Bulgaria. */
        BG = 'BG',
        /** Bahrain. */
        BH = 'BH',
        /** Burundi. */
        BI = 'BI',
        /** Benin. */
        BJ = 'BJ',
        /** Saint Barthélemy. */
        BL = 'BL',
        /** Bermuda. */
        BM = 'BM',
        /** Brunei. */
        BN = 'BN',
        /** Bolivia. */
        BO = 'BO',
        /** Bonaire, Sint Eustatius and Saba. */
        BQ = 'BQ',
        /** Brazil. */
        BR = 'BR',
        /** Bahamas. */
        BS = 'BS',
        /** Bhutan. */
        BT = 'BT',
        /** Bouvet Island. */
        BV = 'BV',
        /** Botswana. */
        BW = 'BW',
        /** Belarus. */
        BY = 'BY',
        /** Belize. */
        BZ = 'BZ',
        /** Canada. */
        CA = 'CA',
        /** Cocos (Keeling) Islands. */
        CC = 'CC',
        /** Congo, The Democratic Republic Of The. */
        CD = 'CD',
        /** Central African Republic. */
        CF = 'CF',
        /** Congo. */
        CG = 'CG',
        /** Switzerland. */
        CH = 'CH',
        /** Côte d'Ivoire. */
        CI = 'CI',
        /** Cook Islands. */
        CK = 'CK',
        /** Chile. */
        CL = 'CL',
        /** Republic of Cameroon. */
        CM = 'CM',
        /** China. */
        CN = 'CN',
        /** Colombia. */
        CO = 'CO',
        /** Costa Rica. */
        CR = 'CR',
        /** Cuba. */
        CU = 'CU',
        /** Cape Verde. */
        CV = 'CV',
        /** Curaçao. */
        CW = 'CW',
        /** Christmas Island. */
        CX = 'CX',
        /** Cyprus. */
        CY = 'CY',
        /** Czech Republic. */
        CZ = 'CZ',
        /** Germany. */
        DE = 'DE',
        /** Djibouti. */
        DJ = 'DJ',
        /** Denmark. */
        DK = 'DK',
        /** Dominica. */
        DM = 'DM',
        /** Dominican Republic. */
        DO = 'DO',
        /** Algeria. */
        DZ = 'DZ',
        /** Ecuador. */
        EC = 'EC',
        /** Estonia. */
        EE = 'EE',
        /** Egypt. */
        EG = 'EG',
        /** Western Sahara. */
        EH = 'EH',
        /** Eritrea. */
        ER = 'ER',
        /** Spain. */
        ES = 'ES',
        /** Ethiopia. */
        ET = 'ET',
        /** Finland. */
        FI = 'FI',
        /** Fiji. */
        FJ = 'FJ',
        /** Falkland Islands (Malvinas). */
        FK = 'FK',
        /** Faroe Islands. */
        FO = 'FO',
        /** France. */
        FR = 'FR',
        /** Gabon. */
        GA = 'GA',
        /** United Kingdom. */
        GB = 'GB',
        /** Grenada. */
        GD = 'GD',
        /** Georgia. */
        GE = 'GE',
        /** French Guiana. */
        GF = 'GF',
        /** Guernsey. */
        GG = 'GG',
        /** Ghana. */
        GH = 'GH',
        /** Gibraltar. */
        GI = 'GI',
        /** Greenland. */
        GL = 'GL',
        /** Gambia. */
        GM = 'GM',
        /** Guinea. */
        GN = 'GN',
        /** Guadeloupe. */
        GP = 'GP',
        /** Equatorial Guinea. */
        GQ = 'GQ',
        /** Greece. */
        GR = 'GR',
        /** South Georgia And The South Sandwich Islands. */
        GS = 'GS',
        /** Guatemala. */
        GT = 'GT',
        /** Guinea Bissau. */
        GW = 'GW',
        /** Guyana. */
        GY = 'GY',
        /** Hong Kong. */
        HK = 'HK',
        /** Heard Island And Mcdonald Islands. */
        HM = 'HM',
        /** Honduras. */
        HN = 'HN',
        /** Croatia. */
        HR = 'HR',
        /** Haiti. */
        HT = 'HT',
        /** Hungary. */
        HU = 'HU',
        /** Indonesia. */
        ID = 'ID',
        /** Ireland. */
        IE = 'IE',
        /** Israel. */
        IL = 'IL',
        /** Isle Of Man. */
        IM = 'IM',
        /** India. */
        IN = 'IN',
        /** British Indian Ocean Territory. */
        IO = 'IO',
        /** Iraq. */
        IQ = 'IQ',
        /** Iran, Islamic Republic Of. */
        IR = 'IR',
        /** Iceland. */
        IS = 'IS',
        /** Italy. */
        IT = 'IT',
        /** Jersey. */
        JE = 'JE',
        /** Jamaica. */
        JM = 'JM',
        /** Jordan. */
        JO = 'JO',
        /** Japan. */
        JP = 'JP',
        /** Kenya. */
        KE = 'KE',
        /** Kyrgyzstan. */
        KG = 'KG',
        /** Cambodia. */
        KH = 'KH',
        /** Kiribati. */
        KI = 'KI',
        /** Comoros. */
        KM = 'KM',
        /** Saint Kitts And Nevis. */
        KN = 'KN',
        /** Korea, Democratic People's Republic Of. */
        KP = 'KP',
        /** South Korea. */
        KR = 'KR',
        /** Kuwait. */
        KW = 'KW',
        /** Cayman Islands. */
        KY = 'KY',
        /** Kazakhstan. */
        KZ = 'KZ',
        /** Lao People's Democratic Republic. */
        LA = 'LA',
        /** Lebanon. */
        LB = 'LB',
        /** Saint Lucia. */
        LC = 'LC',
        /** Liechtenstein. */
        LI = 'LI',
        /** Sri Lanka. */
        LK = 'LK',
        /** Liberia. */
        LR = 'LR',
        /** Lesotho. */
        LS = 'LS',
        /** Lithuania. */
        LT = 'LT',
        /** Luxembourg. */
        LU = 'LU',
        /** Latvia. */
        LV = 'LV',
        /** Libyan Arab Jamahiriya. */
        LY = 'LY',
        /** Morocco. */
        MA = 'MA',
        /** Monaco. */
        MC = 'MC',
        /** Moldova, Republic of. */
        MD = 'MD',
        /** Montenegro. */
        ME = 'ME',
        /** Saint Martin. */
        MF = 'MF',
        /** Madagascar. */
        MG = 'MG',
        /** Macedonia, Republic Of. */
        MK = 'MK',
        /** Mali. */
        ML = 'ML',
        /** Myanmar. */
        MM = 'MM',
        /** Mongolia. */
        MN = 'MN',
        /** Macao. */
        MO = 'MO',
        /** Martinique. */
        MQ = 'MQ',
        /** Mauritania. */
        MR = 'MR',
        /** Montserrat. */
        MS = 'MS',
        /** Malta. */
        MT = 'MT',
        /** Mauritius. */
        MU = 'MU',
        /** Maldives. */
        MV = 'MV',
        /** Malawi. */
        MW = 'MW',
        /** Mexico. */
        MX = 'MX',
        /** Malaysia. */
        MY = 'MY',
        /** Mozambique. */
        MZ = 'MZ',
        /** Namibia. */
        NA = 'NA',
        /** New Caledonia. */
        NC = 'NC',
        /** Niger. */
        NE = 'NE',
        /** Norfolk Island. */
        NF = 'NF',
        /** Nigeria. */
        NG = 'NG',
        /** Nicaragua. */
        NI = 'NI',
        /** Netherlands. */
        NL = 'NL',
        /** Norway. */
        NO = 'NO',
        /** Nepal. */
        NP = 'NP',
        /** Nauru. */
        NR = 'NR',
        /** Niue. */
        NU = 'NU',
        /** New Zealand. */
        NZ = 'NZ',
        /** Oman. */
        OM = 'OM',
        /** Panama. */
        PA = 'PA',
        /** Peru. */
        PE = 'PE',
        /** French Polynesia. */
        PF = 'PF',
        /** Papua New Guinea. */
        PG = 'PG',
        /** Philippines. */
        PH = 'PH',
        /** Pakistan. */
        PK = 'PK',
        /** Poland. */
        PL = 'PL',
        /** Saint Pierre And Miquelon. */
        PM = 'PM',
        /** Pitcairn. */
        PN = 'PN',
        /** Palestinian Territory, Occupied. */
        PS = 'PS',
        /** Portugal. */
        PT = 'PT',
        /** Paraguay. */
        PY = 'PY',
        /** Qatar. */
        QA = 'QA',
        /** Reunion. */
        RE = 'RE',
        /** Romania. */
        RO = 'RO',
        /** Serbia. */
        RS = 'RS',
        /** Russia. */
        RU = 'RU',
        /** Rwanda. */
        RW = 'RW',
        /** Saudi Arabia. */
        SA = 'SA',
        /** Solomon Islands. */
        SB = 'SB',
        /** Seychelles. */
        SC = 'SC',
        /** Sudan. */
        SD = 'SD',
        /** Sweden. */
        SE = 'SE',
        /** Singapore. */
        SG = 'SG',
        /** Saint Helena. */
        SH = 'SH',
        /** Slovenia. */
        SI = 'SI',
        /** Svalbard And Jan Mayen. */
        SJ = 'SJ',
        /** Slovakia. */
        SK = 'SK',
        /** Sierra Leone. */
        SL = 'SL',
        /** San Marino. */
        SM = 'SM',
        /** Senegal. */
        SN = 'SN',
        /** Somalia. */
        SO = 'SO',
        /** Suriname. */
        SR = 'SR',
        /** South Sudan. */
        SS = 'SS',
        /** Sao Tome And Principe. */
        ST = 'ST',
        /** El Salvador. */
        SV = 'SV',
        /** Sint Maarten. */
        SX = 'SX',
        /** Syria. */
        SY = 'SY',
        /** Swaziland. */
        SZ = 'SZ',
        /** Turks and Caicos Islands. */
        TC = 'TC',
        /** Chad. */
        TD = 'TD',
        /** French Southern Territories. */
        TF = 'TF',
        /** Togo. */
        TG = 'TG',
        /** Thailand. */
        TH = 'TH',
        /** Tajikistan. */
        TJ = 'TJ',
        /** Tokelau. */
        TK = 'TK',
        /** Timor Leste. */
        TL = 'TL',
        /** Turkmenistan. */
        TM = 'TM',
        /** Tunisia. */
        TN = 'TN',
        /** Tonga. */
        TO = 'TO',
        /** Turkey. */
        TR = 'TR',
        /** Trinidad and Tobago. */
        TT = 'TT',
        /** Tuvalu. */
        TV = 'TV',
        /** Taiwan. */
        TW = 'TW',
        /** Tanzania, United Republic Of. */
        TZ = 'TZ',
        /** Ukraine. */
        UA = 'UA',
        /** Uganda. */
        UG = 'UG',
        /** United States Minor Outlying Islands. */
        UM = 'UM',
        /** United States. */
        US = 'US',
        /** Uruguay. */
        UY = 'UY',
        /** Uzbekistan. */
        UZ = 'UZ',
        /** Holy See (Vatican City State). */
        VA = 'VA',
        /** St. Vincent. */
        VC = 'VC',
        /** Venezuela. */
        VE = 'VE',
        /** Virgin Islands, British. */
        VG = 'VG',
        /** Vietnam. */
        VN = 'VN',
        /** Vanuatu. */
        VU = 'VU',
        /** Wallis And Futuna. */
        WF = 'WF',
        /** Samoa. */
        WS = 'WS',
        /** Kosovo. */
        XK = 'XK',
        /** Yemen. */
        YE = 'YE',
        /** Mayotte. */
        YT = 'YT',
        /** South Africa. */
        ZA = 'ZA',
        /** Zambia. */
        ZM = 'ZM',
        /** Andorra. */
        AD = 'AD',
    }
    //#endregion
}
