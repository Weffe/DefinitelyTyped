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

declare namespace ShopifyBuy {
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
         *
         * @param models The paginated set to fetch the next page of
         */
        fetchNextPage<T extends GraphModel>(models: T[]): T[];
    }

    export interface Config {
        /**
         * The `myshopify` domain for the shop (e.g. `graphql.myshopify.com`).
         */
        domain: string;

        /**
         * The {@link https://help.shopify.com/api/reference/storefront_access_token|Storefront access token} for the shop.
         */
        storefrontAccessToken: string;
    }

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
         * @return The variant corresponding to the options given.
         */
        variantForOptions(product: Product, options: object): ProductVariant;
    }

    export class CollectionResource {
        fetch(id: string): Promise<Product[]>;
        fetchWithProducts(id: string): Promise<any[]>; // TODO fix to be a type: Docs: Fetches a single collection by ID on the shop, not including products.
        fetchAll(pageSizeopt?: number): Promise<any[]>; // TODO fix to be a type: Docs: Fetches all collections on the shop, not including products.
        fetchAllWithProducts(): Promise<any[]>; // TODO fix to be a type: DOC: Fetches all collections on the shop, including products.
        fetchByHandle(handle: string): Promise<any[]>; // TODO fix to be a type: DOC: Fetches a collection by handle on the shop. Assuming it does not give products
        fetchQuery(query: Query): Promise<any[]>; // TODO fix to be a type: DOC: Fetches a collection by handle on the shop. Assuming it does not give products
    }

    export class CheckoutResource {
        create(input?: {
            email?: string;
            lineItems?: LineItemInput[];
            shippingAddress?: MailingAddress;
            note?: string;
            customAttributes?: AttributeInput[];
        }): Promise<Cart>;

        /**
         * Fetches a checkout by ID.
         */
        fetch(id: string): Promise<Cart>;

        /**
         * Add line items to cart
         */
        addLineItems(checkoutId: string | number, lineItems: LineItemInput[]): Promise<Cart>;

        /**
         * Remove line items from cart
         */
        removeLineItems(checkoutId: string, lineItemIds: string[]): Promise<Cart>;

        /**
         * Update a line item quantity based on line item id
         */
        updateLineItems(checkoutId: string, lineItems: LineItemInput[]): Promise<Cart>;

        /**
         * Remove all line items from cart
         */
        clearLineItems(checkoutId: string | number, lineItems: LineItemInput[]): Promise<Cart>;

        /**
         * Replace line items on an existing checkout.
         */
        replaceLineItems(checkoutId: string, lineItems: LineItemInput[]): Promise<Cart>;

        /**
         * Replaces the value of checkout's custom attributes and/or note with values defined in the input
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
         */
        updateEmail(checkoutId: string, email: string): Promise<Cart>;

        /**
         * Applies a discount to an existing checkout using a discount code.
         */
        addDiscount(checkoutId: string, discountCode: string): Promise<Cart>;

        /**
         * Removes the applied discount from an existing checkout.
         */
        removeDiscount(checkoutId: string): Promise<Cart>;

        /**
         * Applies gift cards to an existing checkout using a list of gift card codes
         */
        addGiftCards(checkoutId: string, giftCardCodes: string[]): Promise<Cart>;
        removeGiftCard(checkoutId: string, appliedGiftCardId: string): Promise<Cart>;

        /**
         * Updates shipping address on an existing checkout.
         */
        updateShippingAddress(checkoutId: string, shippingAddress: MailingAddress): Promise<Cart>;
    }

    export class ShopResource {
        /**
         * Fetches shop information (`currencyCode`, `description`, `moneyFormat`, `name`, and `primaryDomain`).
         */
        fetchInfo(): Promise<Shop>;
        /**
         * Fetches shop policies (privacy policy, terms of service and refund policy).
         */
        fetchPolicies(): Promise<Shop>;
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

    // TODO: Update Product, Collection, etc. to match the GraphQL Query Result from the actual source code
    /**
     * https://help.shopify.com/en/api/storefront-api/reference/object/product
     */
    export interface Product extends GraphModel {
        collections: any;
        images: any;
        metafields: any;
        presentmentPriceRanges: any;
        variants: any;
        /**
         * Whether the product is available on the Online Store channel and in stock.
         */
        availableForSale: boolean;
        /**
         * The date and time when the product was created.
         */
        createdAt: string;
        /**
         * Stripped description of the product, single line with HTML tags removed.
         */
        description: string;
        /**
         * The description of the product, complete with HTML formatting.
         */
        descriptionHtml: string;
        /**
         * A human-friendly unique string for the Product automatically generated from its title. They are used by the Liquid templating language to refer to objects.
         */
        handle: string;
        /**
         * Globally unique identifier.
         */
        id: string;

        /**
         * The online store URL for the product. A value of null indicates that the product is not published to the Online Store sales channel.
         */
        onlineStoreUrl?: string;

        /**
         * List of custom product options (maximum of 3 per product).
         */
        options: ProductOption[];

        /**
         * The price range.
         */
        priceRange: ProductPriceRange;

        /**
         * A categorization that a product can be tagged with, commonly used for filtering and searching.
         */
        productType: string;

        /**
         * The date and time when the product was published to the channel.
         */
        publishedAt: string;

        /**
         * A categorization that a product can be tagged with, commonly used for filtering and searching.
         * Additional access scope required for private apps: unauthenticated_read_product_tags.
         */
        tags: string[];

        /**
         * The product’s title.
         */
        title: string;

        /**
         * The date and time when the product was last modified.
         */
        updatedAt: string;

        /**
         * Find a product’s variant based on its selected options.
         * This is useful for converting a user’s selection of product options into a single matching variant.
         *  If there is not a variant for the selected options, null will be returned.
         */
        variantBySelectedOptions: any;
    }

    // https://help.shopify.com/en/api/storefront-api/reference/object/productpricerange
    export interface ProductPriceRange {
        maxVariantPrice: MoneyV2;
        minVariantPrice: MoneyV2;
    }

    /**
     * https://help.shopify.com/en/api/storefront-api/reference/object/productvariant
     */
    export interface ProductVariant extends GraphModel {
        presentmentPrices: any;
        metafields: any;

        /**
         * Indicates if the product variant is available for sale.
         */
        availableForSale: boolean;

        /**
         * The compare at price of the variant.
         * This can be used to mark a variant as on sale, when compareAtPriceV2 is higher than priceV2.
         */
        compareAtPriceV2: MoneyV2;

        /**
         * Globally unique identifier.
         */
        id: string;

        /**
         * The product variant’s price.
         */
        priceV2: MoneyV2;

        /**
         * The product object that the product variant belongs to.
         */
        product: Product;

        /**
         * Whether a customer needs to provide a shipping address when placing an order for the product variant.
         */
        requiresShipping: boolean;

        /**
         * List of product options applied to the variant.
         */
        selectedOptions: any;

        /**
         * The SKU (stock keeping unit) associated with the variant.
         */
        sku: string;

        /**
         * The product variant’s title.
         */
        title: string;

        /**
         * The weight of the product variant in the unit system specified with weightUnit.
         */
        weight?: string;

        /**
         * Unit of measurement for weight
         */
        weightUnit?: WeightUnit;

        /**
         * ImageResource associated with the product variant. This field falls back to the product image if no image is available.
         */

        image?: ImageResource;

        /*
         * Get a checkout url for a specific product variant.
         * You can optionally pass a quantity.
         * If no quantity is passed then quantity will default to 1.
         */
        checkoutUrl(quantitiy: number): string;
    }

    /**
     * https://help.shopify.com/en/api/storefront-api/reference/enum/weightunit
     */
    export enum WeightUnit {
        /**
         * Metric system unit of mass.
         */
        GRAMS = 'GRAMS',
        /**
         * 1 kilogram equals 1000 grams.
         */
        KILOGRAMS = 'KILOGRAMS',
        /**
         * Imperial system unit of mass.
         */
        OUNCES = 'OUNCES',
        /**
         * 1 pound equals 16 ounces.
         */
        POUNDS = 'POUNDS',
    }

    // https://help.shopify.com/en/api/storefront-api/reference/object/productoption
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

    export interface OptionValue {
        name: string;
        option_id: string;
        value: any;
    }

    export interface Collection {
        handle: string;
        body_html: string;
        image: ImageResource;
        id: string;
        metafields: any[];
        published: boolean;
        published_at: string;
        published_scope: string;
        sort_order: string;
        template_suffix: string;
        title: string;
        updated_at: string;
    }

    export interface Cart extends GraphModel {
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
     *  https://help.shopify.com/en/api/storefront-api/reference/input-object/checkoutlineiteminput
     */
    export interface LineItemInput extends GraphModel {
        /**
         * Extra information in the form of an array of Key-Value pairs about the line item.
         */
        customAttributes?: AttributeInput[];

        /**
         * Count of variants to order.
         */
        quantity: number;

        /**
         * ID of line item variant.
         */
        variantId: string;
    }

    /**
     * https://help.shopify.com/en/api/storefront-api/reference/object/checkoutlineitem
     */
    export interface CheckoutLineItem extends GraphModel {
        /**
         * Extra information in the form of an array of Key-Value pairs about the line item.
         */
        customAttributes?: AttributeInput[];

        discountAllocations: DiscountAllocation[];

        /**
         * Count of variants to order.
         */
        quantity: number;

        /**
         * Globally unique identifier.
         */
        id: number;

        /**
         * Title of the line item. Defaults to the product's title.
         */
        title: string;

        variant: ProductVariant;
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
    export interface DiscountApplication extends GraphModel {
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
         * The two-letter code for the country of the address.
         * For example, US.
         */
        countryCodeV2?: CountryCodeV2;
        /**
         * The first name of the customer.
         */
        firstName?: string;
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
         * The full name of the customer, based on firstName and lastName.
         */
        name?: string;

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
         * The two-letter code for the region.
         * For example, ON.
         */
        provinceCode: string;
        /**
         * The zip or postal code of the address.
         */
        zip?: string;
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
        value: string;
    }

    /**
     *  https://help.shopify.com/api/custom-storefronts/storefront-api/reference/input_object/attributeinput
     *  https://help.shopify.com/api/custom-storefronts/storefront-api/reference/input_object/checkoutlineitemupdateinput
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
     * https://help.shopify.com/en/api/storefront-api/reference/object/image
     */
    export interface ImageResource extends GraphModel {
        altText: string;
        id: string;
        originalSrc: string;
        transformedSrc: string;
    }

    /*
     *   Base Model for the higher level returned objects from the API using GraphQL
     */
    export interface GraphModel {
        attrs?: any;
        onlineStoreUrl?: string;
    }

    export interface Node {
        /**
         * Globally unique identifier.
         */
        id: string;
    }

    /**
     * https://help.shopify.com/en/api/storefront-api/reference/object/order
     */
    export interface Order extends Node {
        /**
         * Discounts that have been applied on the order.
         */
        discountApplications: DiscountApplication;
        /**
         * List of the order’s line items.
         */
        lineItems: OrderLineItem[];
        /**
         * The code of the currency used for the payment.
         */
        currencyCode: string;
        /**
         * The locale code in which this specific order happened.
         */
        customerLocale?: string;
        /**
         * The unique URL that the customer can use to access the order.
         */
        customerUrl?: string;
        /**
         * The customer's email address.
         */
        email?: string;
        /**
         * Unique identifier for the order that appears on the order. For example, #1000 or _Store1001.
         */
        name: string;
        /**
         * A unique numeric identifier for the order for use by shop owner and customer.
         */
        orderNumber: number;
        /**
         * The customer's phone number for receiving SMS notifications.
         */
        phone?: number;
        /**
         * The date and time when the order was imported. This value can be set to dates in the past when importing from other systems. If no value is provided, it will be auto-generated based on current date and time.
         */
        processedAt: string;
        /**
         * The address to where the order will be shipped.
         */
        shippingAddress?: any;
        /**
         * The discounts that have been allocated onto the shipping line by discount applications.
         */
        shippingDiscountAllocations: DiscountAllocation;
        /**
         * The unique URL for the order's status page.
         */
        statusUrl: string;
        /**
         * Price of the order before shipping and taxes.
         */
        subtotalPriceV2: MoneyV2;
        /**
         * List of the order’s successful fulfillments.
         */
        successfulFulfillments: any;
        /**
         * The sum of all the prices of all the items in the order, taxes and discounts included (must be positive).
         */
        totalPriceV2: MoneyV2;
        /**
         * The total amount that has been refunded.
         */
        totalRefundedV2: MoneyV2;
        /**
         * The total cost of shipping.
         */
        totalShippingPriceV2: MoneyV2;
        /**
         * The total cost of taxes.
         */
        totalTaxV2?: MoneyV2;
    }

    /**
     * https://help.shopify.com/en/api/storefront-api/reference/object/orderlineitem
     */
    export interface OrderLineItem extends GraphModel {
        /**
         * Extra information in the form of an array of Key-Value pairs about the line item.
         */
        customAttributes?: AttributeInput[];

        discountAllocations: DiscountAllocation[];

        /**
         * Count of variants to order.
         */
        quantity: number;

        /**
         * Title of the line item. Defaults to the product's title.
         */
        title: string;

        variant: ProductVariant;
    }
}

declare module 'shopify-buy' {
    export = ShopifyBuy;
}
