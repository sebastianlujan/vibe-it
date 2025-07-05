import { EventDetail } from '@/components/EventDetail';

type Props = {
  params: {
    id: string;
  };
};

export default function EventDetailPage({ params }: Props) {
  return <EventDetail id={params.id} />;
}