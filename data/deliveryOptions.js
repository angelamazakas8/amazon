// for delivery, there are 3 shipping options to chose from
export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
},{
    id: '2',
    deliveryDays: 3,
    priceCents: 499
},
{
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}]

export function getDeliveryOption(deliveryOptionID) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionID) {
            deliveryOption = option;
            
        } 
    });

    // if delivery Option not found, use default of id: 1
    return deliveryOption || deliveryOptions[0];
}