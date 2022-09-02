export default function Player ({ name, dir, coor, color}) {
  const coordinates = useMemo(() => {
    const styles = {
      transform: coor
    }
    return styles;
  }, [coor]);




  return (
    <div className='Character grid-cell' style={coordinates} data-color={color} data-direction={dir}>
      <div className="Character_sprite grid-cell"></div>
      <div className="Character_name-container">
        <span className="Character_name">{name}</span>
      </div>
      <div className="Character_you-arrow"></div>
    </div>
  );
}