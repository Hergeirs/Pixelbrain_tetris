import React from "react";
import GameComponent from "../../../../GameObject/GameComponent";
import CollisionZone from "../../../../GameObject/CollisionZone";
import Game from "../Game";
import Vector from "../../../../Vector/Vector";
import EventManager from "../../../../EventManager/EventManager";
import { WithWorld } from "../../../../World/HOC/WithWorld";

export function FloorCollision(collider) {
  if (collider.object.name === this.name) return;
  const { rigidBody } = collider.object;
  Game.instance.ableToJump = true;

  rigidBody.velocity = new Vector([rigidBody.velocity.x, 0]);
  this.runnerCollisionEvent = this.collisionEvent(
    collider.object,
    new Vector([0, -rigidBody.weight * 9.82 * rigidBody.gravity])
  );
  rigidBody.force = new Vector();
  rigidBody.gravity = 0;
  // EventManager.instance.registerEvent(this.runnerCollisionEvent);
  rigidBody.acceleration = new Vector([rigidBody.acceleration.x, 0]);
}

class Floor extends GameComponent {
  children = [<CollisionZone dimensions={this.props.dimensions} />];

  collisionEvent = (gameObject, force) => ({
    gameObject: gameObject,
    physics: { force }
  });

  constructor(props) {
    super(props);
    this.initialPosition = this.props.position;
  }

  runnerCollisionEvent;

  handleCollision = FloorCollision.bind(this);

  beforeFrameRender() {
    this.position = this.initialPosition;
  }
}

export default WithWorld(Floor);
