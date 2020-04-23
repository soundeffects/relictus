import { Location } from '../structure';
import { PaperSlip, BrainTank } from '../items';

const net = new Location('net');
const cpu = new Location('cpu');
const carrier = new Location('carrier');
const scrubber = new Location('scrubber');
const medical = new Location('medical');
const synth = new Location('synth');
const cargoFore = new Location('cargoFore');
const cargoAft = new Location('cargoAft');
const parts = new Location('parts');
const pad = new Location('pad');
const doors = new Location('doors');
const tanks = new Location('tanks');
const station = new Location('station');
const maintainence = new Location('maintainence');
const lock = new Location('lock');
const generator = new Location('generator');
const batteryOne = new Location('batteryOne');
const batteryTwo = new Location('batteryTwo');
const reactor = new Location('reactor');
const overUpper = new Location('overUpper');
const starboardUpper = new Location('starboardUpper');
const underUpper = new Location('underUpper');
const portUpper = new Location('portUpper');
const overLower = new Location('overLower');
const starboardLower = new Location('starboardLower');
const underLower = new Location('underLower');
const portLower = new Location('portLower');
const nose = new Location('nose');
const tail = new Location('tail');

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