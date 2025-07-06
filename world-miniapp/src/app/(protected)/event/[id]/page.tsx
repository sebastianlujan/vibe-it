import { EventDetail } from '@/components/EventDetail';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  return <EventDetail id={id} />;
}