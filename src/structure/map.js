import { Location } from '../structure';
import { PaperSlip, BrainTank } from '../items';

const net = new Location('map.net');
const cpu = new Location('map.cpu');
const carrier = new Location('map.carrier');
const scrubber = new Location('map.scrubber');
const medical = new Location('map.medical');
const synth = new Location('map.synth');
const cargoFore = new Location('map.cargoFore');
const cargoAft = new Location('map.cargoAft');
const parts = new Location('map.parts');
const pad = new Location('map.pad');
const doors = new Location('map.doors');
const tanks = new Location('map.tanks');
const station = new Location('map.station');
const maintainence = new Location('map.maintainence');
const lock = new Location('map.lock');
const generator = new Location('map.generator');
const batteryOne = new Location('map.batteryOne');
const batteryTwo = new Location('map.batteryTwo');
const reactor = new Location('map.reactor');
const overUpper = new Location('map.overUpper');
const starboardUpper = new Location('map.starboardUpper');
const underUpper = new Location('map.underUpper');
const portUpper = new Location('map.portUpper');
const overLower = new Location('map.overLower');
const starboardLower = new Location('map.starboardLower');
const underLower = new Location('map.underLower');
const portLower = new Location('map.portLower');
const nose = new Location('map.nose');
const tail = new Location('map.tail');

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