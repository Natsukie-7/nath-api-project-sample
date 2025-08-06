import Subscription, {
  type Subscription as SubscriptionParams,
} from '@models/subscription.model.ts';
import HttpError from '@utils/httpError.ts';

interface CreateSubscription {
  name: string;
  price: number;
  currency: SubscriptionParams['currency'];
  frequency: SubscriptionParams['frequency'];
  category: SubscriptionParams['category'];
  startDate: Date;
  paymentMethod: SubscriptionParams['paymentMethod'];
}
export const createSubscription: PostRequest<CreateSubscription> = async (
  req,
  res
) => {
  const user = req.user;

  if (!user) {
    throw new HttpError({ message: 'usuario não encontrado', statusCode: 412 });
  }

  const { _id } = user;
  const body = req.body;

  const subscription = await Subscription.create({
    ...body,
    user: _id,
  });

  return {
    status: 201,
    data: subscription,
  };
};
