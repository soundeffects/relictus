import { Location } from '../structure';
import { PaperSlip, BrainTank } from '../items';

const net = new Location('Net Device');
const cpu = new Location('Central Processing Unit');
const carrier = new Location('Carrier');
const scrubber = new Location('Scrubber');
const medical = new Location('Medical Center');
const synth = new Location('Nutrient Synthesizer');
const cargoFore = new Location('Cargo Bay, Fore');
const cargoAft = new Location('Cargo Bay, Aft');
const parts = new Location('Cargo Bay, Lander Parts Storage');
const pad = new Location('Cargo Bay, Lander Pad');
const doors = new Location('Cargo Bay Doors');
const tanks = new Location('Cargo Bay, Resource Tanks');
const station = new Location('Cargo Bay, Bot Station');
const maintainence = new Location('Cargo Bay, Bot Maintainence');
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

net.description = "The free space in here is limited. There are various folds of material, wires, and mechanisms packed away. You see the flash of sparks every once in a while from a couple of the wires; it appears there are some things in disrepair.";
cpu.description = "This 'room' is just a cylindrical tunnel with rails for a bot to pass through. On all sides are greyed-out panels, switches, and a few labels marking various named 'processing units.' Snaking through the machinery are a few water pipes.";
station.description = "In this corner of the cargo bay, there's the frame of a box with open sides. Inside there are various scraps of technology and the damaged carcasses of bots, but all complicated stuff that seems above your pay grade.";

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
maintainence.link(station, 'port');
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

carrier.addContent(new BrainTank());
station.addContent(new PaperSlip());

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
  maintainence,
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