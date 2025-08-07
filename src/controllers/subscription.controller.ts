import Subscription, {
  type Subscription as SubscriptionParams,
} from '@models/subscription.model';
import Authorization from '@utils/authorization';

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
  const authorization = Authorization.getInstance();
  const user = authorization.getUser();

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

interface GetAllSubscription {}
export const GetAllSubscription: GetRequest<GetAllSubscription> = (
  req,
  res
) => {
  const authorization = Authorization.getInstance();
  const user = authorization.getUser();

  return {};
};
