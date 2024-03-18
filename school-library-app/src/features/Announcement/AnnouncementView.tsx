interface NewsCardViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inew: Record<string, any>;
}

const AnnouncementCardView = ({ inew }: NewsCardViewProps) => {
  console.log(inew);
  return <div dangerouslySetInnerHTML={{ __html: inew.content }} />;
};
export default AnnouncementCardView;
