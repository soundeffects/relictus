import { Location } from './structure';
import * as Items from './items';

const net = new Location('Net Device');
const cpu = new Location('Central Processing Unit');
const carrier = new Location('Carrier');
const scrubber = new Location('Scrubber');
const medical = new Location('Medical Center');
const synth = new Location('Nutrient Synthesizer');
const cargoFore = new Location('Cargo Bay, Fore');
const cargoAft = new Location('Cargo Bay, Aft');
const parts = new Location('Cargo Bay, Lander Parts Storage');
const pad = new Location('Cargo Bay, Construction Pad');
const doors = new Location('Cargo Bay Doors');
const tanks = new Location('Cargo Bay, Resource Tanks');
const station = new Location('Cargo Bay, Bot Station');
const maintenance = new Location('Cargo Bay, Maintenance Pad');
const lock = new Location('Heat Lock Access Point');
const generator = new Location('Generator');
const batteryOne = new Location('Battery One');
const batteryTwo = new Location('Battery Two');
const reactor = new Location('Reactor Monitor');
const overUpper = new Location('Over-side Upper Exterior');
const starboardUpper = new Location('Starboard-side Upper Exterior');
const underUpper = new Location('Under-side Upper Exterior');
const portUpper = new Location('Port-side Upper Exterior');
const overLower = new Location('Over-side Lower Exterior');
const starboardLower = new Location('Starboard-side Lower Exterior');
const underLower = new Location('Under-side Lower Exterior');
const portLower = new Location('Port-side Lower Exterior');
const nose = new Location('Nose Exterior');
const tail = new Location('Tail Exterior');

net.link(cpu, 'aft');
cpu.link(carrier, 'aft');
carrier.link(scrubber, 'aft');
medical.link(scrubber, 'starboard');
synth.link(scrubber, 'port');
scrubber.link(cargoFore, 'aft');
parts.link(cargoFore, 'starboard');
parts.link(pad, 'aft');
tanks.link(cargoFore, 'port');
tanks.link(station, 'aft');
cargoFore.link(cargoAft, 'aft');
pad.link(cargoAft, 'starboard');
doors.link(pad, 'starboard');
station.link(cargoAft, 'port');
maintenance.link(station, 'port');
cargoAft.link(lock, 'aft');
lock.link(generator, 'aft');
batteryOne.link(generator, 'starboard');
batteryTwo.link(generator, 'port');
generator.link(reactor, 'aft');
portUpper.link(doors, 'aft');
portLower.link(doors, 'fore');
underUpper.link(portUpper, 'starboard');
underLower.link(portLower, 'starboard');
underLower.link(underUpper, 'fore');
starboardUpper.link(underUpper, 'starboard');
starboardLower.link(underLower, 'starboard');
starboardLower.link(starboardUpper, 'fore');
overUpper.link(starboardUpper, 'starboard');
overLower.link(starboardLower, 'starboard');
overLower.link(overUpper, 'fore');
portUpper.link(overUpper, 'starboard');
portLower.link(overLower, 'starboard');
nose.link(overUpper, 'fore', true);
overUpper.link(nose, 'fore', true);
nose.link(underUpper, 'aft', true);
underUpper.link(nose, 'fore', true);
nose.link(portUpper, 'port', true);
portUpper.link(nose, 'fore', true);
nose.link(starboardUpper, 'starboard', true);
starboardUpper.link(nose, 'fore', true);
tail.link(overLower, 'fore', true);
overLower.link(tail, 'aft', true);
tail.link(underLower, 'aft', true);
underLower.link(tail, 'aft', true);
tail.link(portLower, 'port', true);
portLower.link(tail, 'aft', true);
tail.link(starboardLower, 'starboard', true);
starboardLower.link(tail, 'aft', true);

function resetDescriptions() {
  net.description = "The free space in here is limited. There are various folds of material, wires, and mechanisms packed away. You see the flash of sparks every once in a while from a couple of the wires; it appears there are some things in disrepair.";
  cpu.description = "This 'room' is just a cylindrical tunnel with rails for a bot to pass through. On all sides are greyed-out panels, switches, and a few labels marking various units of the processor. Snaking through the machinery are a few water pipes.";
  carrier.description = "There are bulky tanks occupying most of the space in the small room, about twenty in total. They're attached to the walls with what looks like coolant pipes. You can see that they're very heavily insulated. Unfortunately a few pipes have been severed, and a few tanks look dented, but for the most part this room has escaped serious damage. Most of the pipes lead into the aft wall.";
  scrubber.description = "Pipes leading out from the fore wall make their way into large vats and machinery that take up the space in the corners of the room, out of the way of the doorways on all four sides. These machines look in decent shape. They have labels such as 'Oxygen,' 'Water,' and 'Glucose.'";
  medical.description = "In this room, towards the opposite wall of the one you came in through, there is a cylindrical apparatus that is hollow and has a sliding hatch to the front. The walls of this apparatus are glass, and you can see that inside it there are three mechanical arms with intricate tools attached to the ends. Pipes lead into this apparatus from the wall with the doorway you came in through. To either side of the apparatus, there are white containers fixed to the walls with red cross symbols printed on them.";
  synth.description = "Pipes lead from the doorway you just came through to a large crucible tank to the far end of the room. All kinds of dials are on this crucible, from temperature to pressure to countless others. This crucible extends to the walls of the room on both sides, so there is little space to move around in.";
  cargoFore.description = "Part of the large cargo bay of the ship. The raised cieling makes the whole cargo bay feel rather majestic. As for this section, its rather empty, mainly used as a corridor to get to other sections of the bay.";
  cargoAft.description = "Part of the large cargo bay of the ship. The raised cieling makes the whole cargo bay feel rather majestic. As for this section, its rather empty, mainly used as a corridor to get to other sections of the bay. Unlike the corridor to the fore of the cargo bay, the pathway aft is blocked by a small circular portal with a durable looking door.";
  parts.description = "In this corner of the cargo bay, there's a few large aluminum containers that are spilling out assortments of different modular parts, which are now floating everywhere due to the weightlessness of space. These parts come in all shapes, sizes and functions. Unfortunately it doesn't look like they were meant to be spilled, because many of them look more like debris than anything useful.";
  pad.description = "In this corner of the cargo bay there's a raised platform, and two large mechanical arms attached to the cieling are hanging limp over it. The platform has rails leading to the cargo bay doors.";
  doors.description = "The walls, cieling and floor of the cargo bay slope converge as they reach a giant doorway, taking up most of the wall on this side of the cargo bay. The sliding doors seem tough and imposing.";
  tanks.description = "In this corner of the cargo bay, there's a few long cylinders reaching from floor to cieling. Each is made of shiny metal. Each is labeled, with the text reading along the length of the tube, meaning the text is vertical. This makes it rather difficult to read, but you can make out labels such as 'Soldering Iron,' and 'Control Propellant.'";
  station.description = "In this corner of the cargo bay, there's a large rectangular frame with open sides, attached to the floor. Inside there are various scraps of technology and the damaged carcasses of bots, but all complicated stuff that seems above your pay grade.";
  maintenance.description = "Past the rectangular frame of the Bot Station, there's a small pad tucked away in the back, with a few robotic arms, equipped with various tools, angled to have access to the pad.";
  lock.description = "A small chamber with white spotless walls and a bright light overhead. There is a small panel to the port wall that is dark, it doesn't appear to be functioning anymore.";
  generator.description = "";
  batteryOne.description = "";
  batteryTwo.description = "";
  reactor.description = "";
  overUpper.description = "";
  starboardUpper.description = "";
  underUpper.description = "";
  portUpper.description = "";
  overLower.description = "";
  starboardLower.description = "";
  underLower.description = "";
  portLower.description = "";
  nose.description = "";
  tail.description = "";
}

resetDescriptions();

function resetContents() {
  net.clearContents();
  net.addContent(new Items.Wires());
  net.addContent(new Items.Rails());
  net.addContent(new Items.BotCore());
  
  cpu.clearContents();
  cpu.addContent(new Items.Processor());
  cpu.addContent(new Items.Pipes());
  cpu.addContent(new Items.Rails());
  
  carrier.clearContents();
  carrier.addContent(new Items.Pipes());
  carrier.addContent(new Items.BrainTanks());
  carrier.addContent(new Items.Blobs());
  carrier.addContent(new Items.Rails());
  
  scrubber.clearContents();
  scrubber.addContent(new Items.Scrubbers());
  scrubber.addContent(new Items.Pipes());
  scrubber.addContent(new Items.Rails());
  
  medical.clearContents();
  medical.addContent(new Items.Surgeon());
  medical.addContent(new Items.HealthContainers());
  medical.addContent(new Items.Rails());
  
  synth.clearContents();
  synth.addContent(new Items.Synth());
  synth.addContent(new Items.Pipes());
  synth.addContent(new Items.Rails());
  
  cargoFore.clearContents();
  cargoFore.addContent(new Items.Rails());
  
  cargoAft.clearContents();
  cargoAft.addContent(new Items.Lock());
  cargoAft.addContent(new Items.Rails());
  
  parts.clearContents();
  parts.addContent(new Items.PartContainers());
  parts.addContent(new Items.PartDebris());
  parts.addContent(new Items.Rails());
  
  pad.clearContents();
  pad.addContent(new Items.ConstructionPad());
  pad.addContent(new Items.Rails());
  
  doors.clearContents();
  doors.addContent(new Items.BayDoors());
  doors.addContent(new Items.Rails());
  
  tanks.clearContents();
  tanks.addContent(new Items.TankPart());
  tanks.addContent(new Items.ResourceTanks());
  tanks.addContent(new Items.Rails());
  
  station.clearContents();
  station.addContent(new Items.PartDebris());
  station.addContent(new Items.StationFrame());
  station.addContent(new Items.PaperSlip());
  station.addContent(new Items.Rails());
  
  maintenance.clearContents();
  maintenance.addContent(new Items.MaintenancePad());
  maintenance.addContent(new Items.BotCore());
  maintenance.addContent(new Items.Rails());
}

resetContents();

export default {
  net,
  cpu,
  carrier,
  scrubber,
  medical,
  synth,
  cargoFore,
  cargoAft,
  parts,
  pad,
  doors,
  tanks,
  station,
  maintenance,
  lock,
  generator,
  batteryOne,
  batteryTwo,
  reactor,
  overUpper,
  starboardUpper,
  underUpper,
  portUpper,
  overLower,
  starboardLower,
  underLower,
  portLower,
  nose,
  tail
};

function resetMap() {
  resetContents();
  resetDescriptions();
}

export { resetMap };